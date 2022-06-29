import axios from 'axios';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../axios/request';
import './UpdateTrek.scss';
import MapTrek from '../MapTrek/MapTrek';
import Map from '../Map/Map';
import ImageWarning from './images/warning.png';

function UpdateTrek({ token, isLogged }) {
  const { id } = useParams();
  const [trekData, setTrekData] = useState({});
  const [trekDataPictures, setTrekDataPictures] = useState([]);

  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateCity, setUpdateCity] = useState('');
  const [updateDistance, setUpdateDistance] = useState(0);
  const [updateDuration, setUpdateDuration] = useState(0);
  const [updateDifficulty, setUpdateDifficulty] = useState(0);
  const [updatePictures, setUpdatePictures] = useState('');
  // const [updateCoordinate, setUpdateCoordinate] = useState([]);

  const [labelArray, setLabelArray] = useState([]);
  const [listCity, setListCity] = useState([]);
  const [codePostal, setCodePostal] = useState('');
  const [disableSelect, setDisableSelect] = useState(true);

  const [mapCoordinate, setMapCoordinate] = useState([[], []]);
  const [startMarker, setStartMarker] = useState('');
  const [endMarker, setEndMarker] = useState();
  const [newCoordinate, setNewCoordinate] = useState(true);
  const [startCoordinate, setStartCoordinate] = useState({ lat: 0, lng: 0 });
  const [endCoordinate, setEndCoordinate] = useState({ lat: 0, lng: 0 });
  const [startOrEndCoordinate, setStartOrEndCoordinate] = useState('');
  const [trekPolyline, setTrekPolyline] = useState([[], []]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorTrek, setErrorTrek] = useState(false);

  const navigate = useNavigate();
  const getCityNameByPostalCode = (sendCp) => {
    // Vérification si le code postal contient bien 5 chiffres
    axios.get(`https://geo.api.gouv.fr/communes?codePostal=${sendCp}`)
      .then((res) => {
        setListCity(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setErrorTrek(false);
    try {
      const getTrek = async (trekId) => {
        const trek = await api.getTrekById(trekId);

        if (trek === null) {
          setErrorTrek(true);
        }
        if (trek.status === 200) {
          // Création d'un tableau contenant les coordonées de la randonnée afin de la dessiner sur Leaflet
          const mapPoint = [];
          mapPoint.push([trek.data.coordinate[0], trek.data.coordinate[1]]);
          mapPoint.push([trek.data.coordinate[2], trek.data.coordinate[3]]);
          setMapCoordinate(mapPoint);

          // Création d'un OBJ contenant LAT et LNG pour les coordonées du market sur Leaflet
          const positionStartMarker = {
            lat: Number(trek.data.coordinate[0]),
            lng: Number(trek.data.coordinate[1]),
          };
          setStartMarker(positionStartMarker);

          // Création d'un OBJ contenant LAT et LNG pour les coordonées du market sur Leaflet
          const positionEndMarker = {
            lat: Number(trek.data.coordinate[2]),
            lng: Number(trek.data.coordinate[3]),
          };
          setEndMarker(positionEndMarker);

          setTrekData(trek.data);
          setTrekDataPictures(trek.data.pictures);
          setUpdateDistance(trek.data.distance);
          setUpdateDuration(trek.data.duration);
          setUpdateTitle(trek.data.title);
          setUpdateCity(trek.data.city);
          setUpdateDifficulty(trek.data.difficulty_id);
          setUpdateDescription(trek.data.description);

          setNewCoordinate(false);
        }
      };
      getTrek(id);
      const getLabel = async () => {
        const label = await api.getLabel();
        if (label.status === 200) {
          setLabelArray(label.data);
        }
      };
      getLabel();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Si l'utilisateur est connecté on lui affiche son dashboard
  if (!isLogged) {
    return (
      <p className="msg-error p-2 bg-amber-50 rounded-md shadow-md"><img src={ImageWarning} alt="logo de warning" />Vous devez être connecté pour accéder à la page profil</p>
    );
  }
  if (errorTrek) {
    return (
      <p className="msg-error p-2 bg-amber-50 rounded-md shadow-md"><img src={ImageWarning} alt="logo de warning" />La randonnée n'existe pas.</p>
    );
  }
  if (!isLoading) {
    return (

      <div className="UpdateTrek">
        <h1 className="UpdateTrek-h1">Bienvenu sur la modification de votre Randonnée</h1>
        <form
          className="UpdateTrek-form"
          onSubmit={async (e) => {
            e.preventDefault();
            if (token.access_token) {
              const decodedToken = jwtDecode(token.access_token);
              const { userId } = decodedToken;
              const dataCoordinate = [];
              // Création du tableau des coordonnée à envoyer à la BDD
              dataCoordinate.push(startCoordinate.lat, startCoordinate.lng);
              dataCoordinate.push(endCoordinate.lat, endCoordinate.lng);

              try {
                const updateTrek = await api.updateTrek(token, id, userId, updateTitle, updateDescription, updateDistance, updateDuration, updateCity, dataCoordinate, updateDifficulty);
                if (updateTrek.status === 200) {
                  swal('Votre randonnée a bien était mise à jour', '', 'success');
                  navigate(`/trek/${id}`);
                }
              } catch (error) {
                console.log(error);
              }
            }
          }}
        >
          <div className="UpdateTrek-input-container">
            <label className="UpdateTrek-label" htmlFor="title">
              <span className="UpdateTreklabel-text">Titre de la Randonnée:</span>
              <input
                id="title"
                name="title"
                className="UpdateTrek-input shadow-lg rounded-md"
                placeholder={trekData.title}
                type="text"
                value={updateTitle}
                onChange={(event) => {
                  setUpdateTitle(event.target.value);
                }}
              />
            </label>
            <label className="UpdateTrek-label" htmlFor="description">
              <span className="UpdateTreklabel-text">Description de la Randonnée:</span>
              <input
                id="description"
                name="description"
                className="UpdateTrek-input shadow-lg rounded-md"
                placeholder={trekData.description}
                type="text"
                value={updateDescription}
                onChange={(event) => {
                  setUpdateDescription(event.target.value);
                }}
              />
            </label>
            {
}
            <label className="UpdateTrek-label" htmlFor="cp">
              <span className="UpdateTreklabel-text">Saisir code postal:</span>
              <input
                className="UpdateTrek-input shadow-lg rounded-md"
                placeholder="Saisir un code postal"
                id="cp"
                name="cp"
                type="text"
                maxLength={5}
                minLength={5}
                value={codePostal}
                onChange={(event) => {
                  setCodePostal(event.target.value);
                  // Vérification de la taille tu CP afin de consommer l'API via getCityNameByPostalCode()
                  if (event.target.value.length === 5) {
                    getCityNameByPostalCode(event.target.value);
                    setDisableSelect(!disableSelect);
                  } else {
                    setDisableSelect(true);
                  }
                }}
              />
            </label>
            <label className="UpdateTrek-label" htmlFor="city">
              <span className="UpdateTreklabel-text">Choisissez une Ville pour la randonnée :</span>

              {disableSelect ? (
                <select name="city" id="city" disabled>
                  <option value="default">Sélectionner votre ville</option>
                </select>

              ) : (

              // Si disableSelect est false on affiche la selection des villes à l'utilisateur
                <select
                  name="city"
                  id="city"
                  value={updateCity}
                  onChange={(e) => {
                    setUpdateCity(e.target.value);
                  }}
                >
                  <option value="default">Sélectionner votre ville</option>
                  {listCity.map((oneCity) => (<option key={oneCity.code} value={oneCity.nom}>{oneCity.nom}</option>))}

                </select>
              )}

            </label>
            <label className="UpdateTrek-label" htmlFor="distance">
              <span className="UpdateTreklabel-text">Distance de la Randonnée ( en KM ):</span>
              <input
                id="distance"
                name="distance"
                className="UpdateTrek-input shadow-lg rounded-md"
                placeholder={trekData.distance}
                type="number"
                value={updateDistance}
                onChange={(event) => {
                  setUpdateDistance(event.target.value);
                }}
              />
            </label>
            <label className="UpdateTrek-label" htmlFor="duration">
              <span className="UpdateTreklabel-text">Durée de la Randonnée ( en Minutes ):</span>
              <input
                id="duration"
                name="duration"
                className="UpdateTrek-input shadow-lg rounded-md"
                placeholder={trekData.duration}
                type="number"
                value={updateDuration}
                onChange={(event) => {
                  setUpdateDuration(event.target.value);
                }}
              />
            </label>

            <label className="UpdateTrek-label" htmlFor="difficulty">
              <span className="UpdateTrek-label-text">Difficulté de la Randonnée :</span>
              <select
                value={updateDifficulty}
                name="difficulty"
                id="difficulty"
                onChange={(event) => {
                  setUpdateDifficulty(event.target.value);
                }}
              >
                {/* Faire en sorte que le SELECT provienne de la base de donnée */}
                <option>Choisir une Difficulté</option>
                {labelArray.map((label) => <option key={label.id} value={label.id}>{label.label}</option>)}

              </select>
            </label>
          </div>
          <button type="button" className="UpdateTrek-button bg-stone-500 text-white hover:bg-stone-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={() => { setNewCoordinate(!newCoordinate); }}>Modifier les coordonées de la randonnée</button>

          {!newCoordinate && <MapTrek mapCoordinate={mapCoordinate} startMarker={startMarker} endMarker={endMarker} /> }
          {newCoordinate && (
          <div className="UpdateTrek-coordinate">
            <div className="UpdateTrek-coordinate-top">
              <label className="UpdateTrek-label label-coordinate" htmlFor="coordinate" id="coordinate">
                <span className="UpdateTrek-label-text">Saississez des Coordonnées pour la randonnée :</span>

                <div className="UpdateTrek-input-coordinate">
                  <p>Point de départ: </p>

                  <input
                    className="UpdateTrek-input shadow-lg rounded-md"
                    placeholder="Latitude"
                    id="startLatCoord"
                    name="startLatCoord"
                    type="number"
                    step="0.01"
                    required
                    value={startCoordinate.lat}
                    disabled
                  />

                  <input
                    className="UpdateTrek-input shadow-lg rounded-md"
                    placeholder="Longitude"
                    id="startLngCoord"
                    name="startLngCoord"
                    type="number"
                    step="0.01"
                    required
                    value={startCoordinate.lng}
                    disabled
                  />
                </div>
                <div className="UpdateTrek-input-coordinate">
                  <p>Point de d'arrivée: </p>
                  <input
                    className="UpdateTrek-input shadow-lg rounded-md"
                    placeholder="Latitude"
                    id="endLatCoord"
                    name="endLatCoord"
                    type="number"
                    step="0.01"
                    required
                    value={endCoordinate.lat}
                    disabled
                  />
                  <input
                    className="UpdateTrek-input shadow-lg rounded-md"
                    placeholder="Longitude"
                    id="endLngCoord"
                    name="endLngCoord"
                    type="number"
                    step="0.01"
                    required
                    value={endCoordinate.lng}
                    disabled
                  />
                </div>
              </label>
            </div>

            <select
              name="startEndPosition"
              id="startEndPosition"
              onChange={(e) => {
                setStartOrEndCoordinate(e.target.value);
              }}
            >
              <option value="null">Saisir une action</option>
              <option value="start">Ajouter point de départ</option>
              <option value="end">Ajouter point d'arrivée</option>
            </select>

            <div className="UpdateTrek-coordinate-bottom" />

            <Map
              setStartCoordinate={setStartCoordinate}
              setEndCoordinate={setEndCoordinate}
              defineStartOrEndPosition={startOrEndCoordinate}
              setTrekPolyline={setTrekPolyline}
              trekPolyline={trekPolyline}
            />
          </div>
          )}

          <div className="UpdateTrek-button-container">
            <button className="UpdateTrek-button bg-stone-500 text-white hover:bg-stone-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit">Mise à jour de la randonnée</button>

          </div>
        </form>
        <div className="UpdateTrek-container-bottom">
          <div className="UpdateTrek-imgContainer">
            {trekDataPictures.map((picture) => (
              <div className="UpdateTrek-label-text" key={picture}>
                <span className="UpdateTrek-label-text-span"> Photos de votre Randonnée</span>
                <img className="UpdateTrek-img" src={picture} alt={picture} />
                <div
                  className="UpdateTrek-deleteImgButton bg-stone-500 text-white hover:bg-stone-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  onClick={async () => {
                    try {
                      const deletePicture = await api.deletePicture(id, picture, token);

                      if (deletePicture.status === 200) {
                        setTrekDataPictures(deletePicture.data.pictures);
                        swal({
                          title: 'Votre photo a bien était supprimé',
                          icon: 'success',
                        });
                      } else {
                        swal({
                          title: 'Problème lors de la mise à jour des données',
                          icon: 'error',
                        });
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >Supprimer cette Photo
                </div>

              </div>
            ))}
          </div>

          <form
            encType="multipart/form-data"
            className="UpdateTrek-addImgButton text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            onSubmit={async (event) => {
              event.preventDefault();
              try {
                const formData = new FormData();
                const tabPhoto = document.getElementById('pictures').files[0];

                formData.append('files', tabPhoto);
                const addPicture = await api.addPicture(id, token, formData);
                if (addPicture.status === 200) {
                  setTrekDataPictures(addPicture.data.pictures);
                  swal('Votre photo a bien était rajouté', '', 'success');
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <label className="UpdateTrek-label " htmlFor="pictures">
              <span className="UpdateTrek-label-text">Ajouter une photo de votre randonée :</span>
              <input
                className="UpdateTrek-input label-photo shadow-lg rounded-md"
                placeholder="Photos de votre Randonnée "
                id="pictures"
                name="pictures"
                type="file"
                accept="images/png, images/jpeg"
                value={updatePictures}
                onChange={(event) => {
                  setUpdatePictures(event.target.value);
                }}
              />

            </label>
            <button className="UpdateTrek-button bg-stone-500 text-white hover:bg-stone-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit">Envoyer la Photo
            </button>
          </form>

        </div>
      </div>
    );
  }
}
UpdateTrek.propTypes = {
  token: PropTypes.object.isRequired,
  isLogged: PropTypes.bool.isRequired,
};
export default UpdateTrek;

// REVIEW OK -- Laurent
// Modification à effectuer
// =====
// Vérifier les labels du formulaire (km, minutes etc.) -- ok !
// Il manque les inputs des coordoonées
