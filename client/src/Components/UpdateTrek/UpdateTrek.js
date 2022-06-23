import axios from 'axios';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../axios/request';
import './UpdateTrek.scss';

function UpdateTrek({ token }) {
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
  const [updateCoordinate, setUpdateCoordinate] = useState([]);

  const [labelArray, setLabelArray] = useState([]);
  const [listCity, setListCity] = useState([]);
  const [codePostal, setCodePostal] = useState('');
  const [disableSelect, setDisableSelect] = useState(true);

  // const [updateCoordinate, setUpdateCoordinate] = useState(0);

  // const navigate = useNavigate();
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
    try {
      axios.get(`http://141.94.207.7:8080/api/treks/${id}`)
        .then((res) => {
          const { data } = res;
          setTrekData(data);
          setTrekDataPictures(res.data.pictures);
          setUpdateDistance(data.distance);
          setUpdateDuration(data.duration);
          setUpdateDuration(data.duration);
          setUpdateTitle(data.title);
          setUpdateCity(data.city);
          setUpdateDifficulty(data.difficulty_id);
          setUpdateDescription(data.description);
          // setUpdatePictures(data.pictures);
          setUpdateCoordinate(data.coordinate);
          console.log(data);
        });
      axios.get('http://141.94.207.7:8080/api/labels')
        .then((res) => {
          setLabelArray(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
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
            try {
              console.log('id trek:', id);
              console.log('userid:', userId);
              console.log('updateTitle:', updateTitle);
              console.log('updateDescription:', updateDescription);
              console.log('updateDistance', updateDistance);
              console.log('updateDuration:', updateDuration);
              console.log('updateCity:', updateCity);
              console.log('updateCoordinate:', updateCoordinate);
              console.log('updateDifficulty:', updateDifficulty);
              const updateTrek = await api.updateTrek(token, id, userId, updateTitle, updateDescription, updateDistance, updateDuration, updateCity, updateCoordinate, updateDifficulty);
              console.log('updateTrek', updateTrek);
              if (updateTrek.status === 200) {
                swal('Votre randonnée a bien était mise à jour', '', 'success');
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
                <option value="default">Selectionner votre ville</option>
                {listCity.map((oneCity) => (<option key={oneCity.code} value={oneCity.nom}>{oneCity.nom}</option>))}

              </select>
            )}

          </label>
          <label className="UpdateTrek-label" htmlFor="distance">
            <span className="UpdateTreklabel-text">Distance de la Randonnée:</span>
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
            <span className="UpdateTreklabel-text">Durée de la Randonnée:</span>
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
            <span className="UpdateTrek-label-text">Difficulté de la Randonnée:</span>
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
              {labelArray.map((label) => <option value={label.id}>{label.label}</option>)}

            </select>
          </label>
        </div>

        <div className="UpdateTrek-button-container">
          <button className="UpdateTrek-button bg-green-900 text-white hover:bg-green-800 active:bg-green-900 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit">Validez</button>

        </div>
      </form>
      <div className="UpdateTrek-container-bottom">
        <div className="UpdateTrek-imgContainer">
          {trekDataPictures.map((picture) => (
            <div className="UpdateTrek-label-text" key={picture}> Photos de votre Randonnée
              <img className="UpdateTrek-img" src={picture} alt={picture} />
              <div
                className="UpdateTrek-deleteImgButton bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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

            console.log(updatePictures);
            try {
              const formData = new FormData();
              const tabPhoto = document.getElementById('pictures').files[0];
              console.log(tabPhoto);
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
          <button className="UpdateTrek-button bg-green-900 text-white hover:bg-green-800 active:bg-green-900 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit">Envoyer la Photo
          </button>
        </form>
      </div>
    </div>
  );
}
UpdateTrek.propTypes = {
  token: PropTypes.object.isRequired,
};
export default UpdateTrek;
