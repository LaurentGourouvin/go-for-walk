import { useEffect, useState } from 'react';
import './Profil.scss';
// data static pour conception du composant
import PropTypes from 'prop-types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
// import data from '../../dataStatic/data_profil';
import authentification from '../../utils/sessionUser/sessionUser';
import ImageWarning from './images/warning.png';

function Profil({ token }) {
  const isLogged = authentification.checkLoggin(token);

  // Si l'utilisateur est connecté on lui affiche son dashboard
  if (!isLogged) {
    return (
      <p className="msg-error p-2 bg-amber-50 rounded-md shadow-md"><img src={ImageWarning} alt="logo de warning" />Vous devez être connecté pour accéder à la page profil</p>
    );
  }
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  let decodedToken = null;
  let userId = null;

  useEffect(() => {
    try {
      if (token) {
        decodedToken = jwtDecode(token.access_token);
        userId = decodedToken.userId;
      }
      axios.get(`http://141.94.207.7:8080/api/users/${userId}`)
        .then((res) => {
          const { data } = res;
          console.log(data);
          setEmail(data.email);
          setName(data.name);
          setFirstName(data.firstname);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      <h1 className="Profil-h1">Bonjour {firstName} {name}</h1>

      <div className="Profil">
        <div className="Profil-Dashboard">
          <div className="Profil-Informations">
            <h2 className="Profil-h2">Votre Profil</h2>
            <div className="Profil-Informations-Card m-7 p-6 max-w-sm bg-white/[.9] rounded-lg border border-white shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg">
              <p>adresse mail {email}</p>

              <p>nom: {name}</p>
              <p>prenom: {firstName}</p>

            </div>
          </div>
          <div className="Profil-Actions">
            <button type="button" className="bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Modifier le profil</button>
            <button type="button" className="bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Consulter mes randonnées</button>
          </div>
        </div>
      </div>
    </>
  );
}

Profil.propTypes = {
  token: PropTypes.object.isRequired,
};
export default Profil;
