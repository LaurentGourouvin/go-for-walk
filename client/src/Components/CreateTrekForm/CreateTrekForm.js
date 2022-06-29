import { useEffect, useState } from 'react';
import './CreateTrekForm.scss';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../axios/request';
import Map from '../Map/Map';
import ImageWarning from './images/warning.png';

function CreateTrekForm({ token, isLogged }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [city, setCity] = useState('');

  const [labelArray, setLabelArray] = useState([]);

  const [pictures, setPictures] = useState([]);
  const [difficultyId, setDifficultyId] = useState('');
  const [listCity, setListCity] = useState([]);
  const [codePostal, setCodePostal] = useState('');
  const [disableSelect, setDisableSelect] = useState(true);
  const [startCoordinate, setStartCoordinate] = useState({ lat: 0, lng: 0 });
  const [endCoordinate, setEndCoordinate] = useState({ lat: 0, lng: 0 });
  const [startOrEndCoordinate, setStartOrEndCoordinate] = useState('');
  const [trekPolyline, setTrekPolyline] = useState([[], []]);

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
    try {
      const getLabel = async () => {
        const label = await api.getLabel();
        if (label.status === 200) {
          setLabelArray(label.data);
        }
      };
      getLabel();
    } catch (err) {
      console.log(err);
    }
  }, []);
  if (!isLogged) {
    return (
      <p className="msg-error p-2 bg-amber-50 rounded-md shadow-md"><img src={ImageWarning} alt="logo de warning" />Vous devez être connecté pour accéder à la page profil</p>
    );
  }
  return (

    <form
      className="CreateTrekForm"
      encType="multipart/form-data"
      onSubmit={async (event) => {
        event.preventDefault();
        if (token.access_token) {
          const decodedToken = jwtDecode(token.access_token);
          const dataPicture = [];

          const dataCoordinate = [];
          dataCoordinate.push(`${startCoordinate.lat},${startCoordinate.lng}`);
          dataCoordinate.push(`${endCoordinate.lat},${endCoordinate.lng}`);

          dataPicture.push(document.getElementById('pictures').files[0]);

          // Mise en place d'un formData car envoie de fichier.
          // L'envoi du fichier nous force à changer le content-type et l'encodage par défaut de notre formulaire.
          // Côté Back l'utilisation de multer nous permet de leur envoyer les informations directement via un FormData
          const formData = new FormData();
          formData.append('title', title);
          formData.append('description', description);
          formData.append('distance', parseInt(distance, 10));
          formData.append('duration', parseInt(duration, 10));
          formData.append('city', city);
          formData.append('coordinate', dataCoordinate);
          formData.append('user_id', decodedToken.userId);
          formData.append('difficulty_id', parseInt(difficultyId, 10));

          // ajout de plusieurs fichier aux formData de façon dynamique
          const tabPhoto = document.getElementById('pictures').files;
          Object.entries(tabPhoto).forEach(
          // eslint-disable-next-line no-unused-vars
            ([key, value]) => {
              formData.append('files', value);
            },
          );
          try {
            const createTrek = await api.createTrek(token, formData);

            if (createTrek.status === 200) {
              navigate('/profil');
            }
          } catch (error) {
            console.log(error);
          }
        }
      }}
    >
      <h1 className="CreateTrekForm-title">Bienvenu dans le formulaire de création de randonnée</h1>
      <div className="CreateTrekForm-input-container">

        <label className="CreateTrekForm-label" htmlFor="title">
          <span className="CreateTrekForm-label-text">Titre de la randonnée :</span>
          <input
            className="CreateTrekForm-input shadow-lg rounded-md"
            placeholder="Choisissez un Titre à votre Randonnée"
            id="title"
            name="title"
            type="text"
            required
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </label>
        <label className="CreateTrekForm-label" htmlFor="description">
          <span className="CreateTrekForm-label-text">Description détaillé de la randonnée :</span>
          <textarea
            className="CreateTrekForm-input CreateTrekForm-textarea hadow-lg rounded-md"
            placeholder="Ecrivez une Description pour votre Randonnée"
            rows="5"
            id="description"
            name="description"
            type="text"
            required
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </label>
        <label className="CreateTrekForm-label" htmlFor="distance">
          <span className="CreateTrekForm-label-text">Choisissez une Distance pour la randonnée ( en KM ) :</span>
          <input
            className="CreateTrekForm-input shadow-lg rounded-md"
            placeholder="Estimation d'une Distance pour votre Randonnée"
            id="distance"
            name="distance"
            type="number"
            required
            value={distance}
            onChange={(event) => {
              setDistance(event.target.value);
            }}
          />
        </label>
        <label className="CreateTrekForm-label" htmlFor="duration">
          <span className="CreateTrekForm-label-text">Choisissez une Durée pour la randonnée ( en Minutes ) :</span>
          <input
            className="CreateTrekForm-input shadow-lg rounded-md"
            placeholder="Estimation d'une Durée pour votre Randonnée"
            id="duration"
            name="duration"
            type="number"
            required
            value={duration}
            onChange={(event) => {
              setDuration(event.target.value);
            }}
          />
        </label>
        <label className="CreateTrekForm-label" htmlFor="cp">
          <span className="CreateTrekForm-label-text">Saisir code postal:</span>
          <input
            className="CreateTrekForm-input shadow-lg rounded-md"
            placeholder="Saisir un code postal"
            id="cp"
            name="cp"
            type="text"
            maxLength={5}
            minLength={5}
            required
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
        <label className="CreateTrekForm-label" htmlFor="city">
          <span className="CreateTrekForm-label-text">Choisissez une Ville pour la randonnée :</span>

          {/* Affichage conditionnel du select pour les villes  */}
          {disableSelect ? (
            <select name="city" id="city" disabled>
              <option value="default">Sélectionner votre ville</option>
            </select>

          ) : (

            // Si disableSelect est false on affiche la selection des villes à l'utilisateur
            <select
              name="city"
              id="city"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            >
              <option value="default">Selectionner votre ville</option>
              {listCity.map((oneCity) => (<option key={oneCity.code} value={oneCity.nom}>{oneCity.nom}</option>))}

            </select>
          )}

        </label>
        <div className="CreateTrekForm-coordinate">
          <div className="CreateTrekForm-coordinate-top">
            <label className="CreateTrekForm-label label-coordinate" htmlFor="coordinate" id="coordinate">
              <span className="CreateTrekForm-label-text">Saississez des Coordonnées pour la randonnée :</span>

              <div className="CreateTrekForm-input-coordinate">
                <p>Point de départ: </p>

                <input
                  className="CreateTrekForm-input shadow-lg rounded-md"
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
                  className="CreateTrekForm-input shadow-lg rounded-md"
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
              <div className="CreateTrekForm-input-coordinate">
                <p>Point de d'arrivée: </p>
                <input
                  className="CreateTrekForm-input shadow-lg rounded-md"
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
                  className="CreateTrekForm-input shadow-lg rounded-md"
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
          <div className="CreateTrekForm-coordinate-bottom">

            <Map
              setStartCoordinate={setStartCoordinate}
              setEndCoordinate={setEndCoordinate}
              defineStartOrEndPosition={startOrEndCoordinate}
              setTrekPolyline={setTrekPolyline}
              trekPolyline={trekPolyline}
            />

          </div>
        </div>

        <label className="CreateTrekForm-label " htmlFor="pictures">
          <span className="CreateTrekForm-label-text">Ajouter une photo de votre randonée :</span>
          <input
            className="CreateTrekForm-input label-photo shadow-lg rounded-md"
            placeholder="Photos de votre Randonnée "
            id="pictures"
            name="pictures"
            type="file"
            accept="images/png, images/jpeg"
            multiple
            required
            value={pictures}
            onChange={(event) => {
              setPictures(event.target.value);
            }}
          />
        </label>

        <label className="CreateTrekForm-label" htmlFor="difficultyId">
          <span className="CreateTrekForm-label-text">Veuillez choisir une Difficulté :</span>

          <select
            value={difficultyId}
            name="difficultyId"
            id="difficultyId"
            onChange={(event) => {
              setDifficultyId(event.target.value);
            }}
          >
            {/* Faire en sorte que le SELECT provienne de la base de donnée */}
            <option value="">Choisir une Difficulté</option>
            {labelArray.map((label) => <option key={label.id} value={label.id}>{label.label}</option>)}
          </select>
        </label>
      </div>

      <div className="RegisterForm--button-container">
        <button className="RegisterForm--button bg-stone-500 text-white hover:bg-stone-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit">Valider</button>
        <button
          className="RegisterForm--button bg-stone-500 text-white hover:bg-stone-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => {
            setTitle('');
            setDescription('');
            setDistance('');
            setDuration('');
            setCity('');
            setStartCoordinate({ lat: 0, lng: 0 });
            setEndCoordinate({ lat: 0, lng: 0 });
            setPictures([]);
            setDifficultyId('');
          }}
        >Réinitialiser le formulaire
        </button>
      </div>
    </form>
  );
}

CreateTrekForm.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  token: PropTypes.object.isRequired,
};
export default CreateTrekForm;

// Review ok ( Dorian )
