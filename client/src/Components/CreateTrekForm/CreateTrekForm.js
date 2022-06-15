import { useState } from 'react';
import './CreateTrekForm.scss';
import PropTypes from 'prop-types';
// import jwtDecode from 'jwt-decode';
// import swal from 'sweetalert';
// import axios from 'axios';

function CreateTrekForm({ token }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [city, setCity] = useState('');
  const [coordinate, setCoordinate] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [difficultyId, setDifficultyId] = useState('');

  // const decodedToken = jwtDecode(token.access_token);
  // const accessToken = token.access_token;

  // const { userId } = decodedToken;

  return (

    <form
      className="CreateTrekForm"
      onSubmit={(event) => {
        event.preventDefault();
        console.log(token);
        //  axios.post(
        //  'http://141.94.207.7:8080/api/treks',
        //  { access_token: accessToken },
        //  {
        //    title: title, description: description, distance: distance, duration: duration, city: city, coordinate: [coordinate], pictures: [pictures], user_id: userId, difficulty_Id: difficultyId,
        //  },

        // )
        //  .then((res) => {
        //    console.log(res);
        //    swal('Randonnée Créée', 'success');
        // })
        //   .catch((error) => {
        //    swal('Cela na pas marché');
        //       console.log(error);
      //    });
      }}
    >
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
          <input
            className="CreateTrekForm-input shadow-lg rounded-md"
            placeholder="Ecrivez une Description pour votre Randonnée"
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
          <span className="CreateTrekForm-label-text">Choisissez une Distance pour la randonnée :</span>
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
          <span className="CreateTrekForm-label-text">Choisissez une Durée pour la randonnée :</span>
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
        <label className="CreateTrekForm-label" htmlFor="city">
          <span className="CreateTrekForm-label-text">Choisissez une Ville pour la randonnée :</span>
          <input
            className="CreateTrekForm-input shadow-lg rounded-md"
            placeholder="Choissiez une Ville pour votre Randonnée"
            id="city"
            name="city"
            type="text"
            required
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        </label>
        <label className="CreateTrekForm-label" htmlFor="coordinate">
          <span className="CreateTrekForm-label-text">Saississez des Coordonnées pour la randonnée :</span>
          <input
            className="CreateTrekForm-input shadow-lg rounded-md"
            placeholder="Coordonnées de votre Randonnée au format : xxx.yyy.aaa "
            id="coordinate"
            name="coordinate"
            type="text"
            required
            value={coordinate}
            onChange={(event) => {
              setCoordinate(event.target.value);
            }}
          />
        </label>
        <label className="CreateTrekForm-label" htmlFor="pictures">
          <span className="CreateTrekForm-label-text">Saississez le(s) lien(s) de Photos pour la randonnée :</span>
          <input
            className="CreateTrekForm-input shadow-lg rounded-md"
            placeholder="Photos de votre Randonnée "
            id="pictures"
            name="pictures"
            type="text"
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
            <option value="">Choisir une Difficulté</option>
            <option value="1">Facile</option>
            <option value="2">Moyen</option>
            <option value="3">Difficile</option>
          </select>
        </label>
      </div>

      <div className="RegisterForm--button-container">
        <button className="RegisterForm--button bg-stone-500 text-white active:bg-stone-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit">Validez</button>
        <button
          className="RegisterForm--button bg-stone-500 text-white active:bg-stone-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => {
            setTitle('');
            setDescription('');
            setDistance('');
            setDuration('');
            setCity('');
            setCoordinate([]);
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

  token: PropTypes.object.isRequired,
};
export default CreateTrekForm;
