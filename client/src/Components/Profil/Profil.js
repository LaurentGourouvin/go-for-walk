import { useEffect, useState } from 'react';
import './Profil.scss';
// data static pour conception du composant
import PropTypes from 'prop-types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
// import data from '../../dataStatic/data_profil';
import swal from 'sweetalert';
import authentification from '../../utils/sessionUser/sessionUser';
import ImageWarning from './images/warning.png';
import Map from '../Map/Map';
import api from '../../axios/request';

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
  const [password, setPassword] = useState('');
  const [updateForm, setUpdateForm] = useState(false);

  const [updateName, setUpdateName] = useState('');
  const [updateFirstName, setUpdateFirstName] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updatePassword, setUpdatePassword] = useState('');

  let decodedToken = null;
  let userId = null;
  const handleUpdateForm = async (e) => {
    e.preventDefault();
    if (token) {
      decodedToken = jwtDecode(token.access_token);
      userId = decodedToken.userId;
    }
    const errorOnSubmitForm = [];

    // Gestion d'erreur
    if (updateName === '') {
      errorOnSubmitForm.push({ label: 'updateName', value: 'Champs Name non renseigné' });
    }
    if (updateEmail === '') {
      errorOnSubmitForm.push({ label: 'updateEmail', value: 'Champs Email non renseigné' });
    }
    if (updatePassword === '') {
      errorOnSubmitForm.push({ label: 'updatePassword', value: 'Champs Password non renseigné' });
    }
    if (updateFirstName === '') {
      errorOnSubmitForm.push({ label: 'updateName', value: 'Champs Prénom non renseigné' });
    }

    // Envoie du formulaire

    if (errorOnSubmitForm.length > 0) {
      swal({
        title: 'Formulaire incomplet',
        icon: 'error',
      });
    } else {
      try {
        const userUpdate = await api.updateUser(updateFirstName, updateName, updatePassword, updateEmail, userId, token);
        if (userUpdate.status === 200) {
          swal({
            title: 'Mise à jour',
            icon: 'success',
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setUpdateForm(false);
      }
    }
  };
  const handleChangeUpdateEmail = (e) => {
    setUpdateEmail(e.target.value);
  };
  const handleChangeUpdatePassword = (e) => {
    setUpdatePassword(e.target.value);
  };
  const handleChangeUpdateName = (e) => {
    setUpdateName(e.target.value);
  };
  const handleChangeUpdateFirstName = (e) => {
    setUpdateFirstName(e.target.value);
  };

  useEffect(() => {
    try {
      // ajout d'une condition pour décoder le TOKEN seulement si celui-ci existe. Cela evitera des erreurs : ERROR ACCES TOKEN
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
          setPassword(data.password);
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
              {!updateForm && (
              <>
                <p>adresse mail {email}</p>
                <p>nom: {name}</p>
                <p>prenom: {firstName}</p>
              </>
              )}

              {updateForm && (
              <form className="Profil-form" onSubmit={handleUpdateForm}>
                <label className="" htmlFor="email">
                  <span>Email:</span>
                  <input
                    className="Profil-input"
                    placeholder={email}
                    type="email"
                    value={updateEmail}
                    onChange={handleChangeUpdateEmail}
                  />
                </label>
                <label className="" htmlFor="password">
                  <span>Password:</span>
                  <input
                    id="password"
                    name="password"
                    className="Profil-input"
                    placeholder={password}
                    type="password"
                    value={updatePassword}
                    onChange={handleChangeUpdatePassword}
                  />
                </label>
                <label className="" htmlFor="name">
                  <span>Name:</span>
                  <input
                    id="name"
                    name="name"
                    className="Profil-input"
                    placeholder={name}
                    type="text"
                    value={updateName}
                    onChange={handleChangeUpdateName}
                  />
                </label>
                <label className="" htmlFor="firstname">
                  <span>Firstname:</span>
                  <input
                    id="firstname"
                    name="firstname"
                    className="Profil-input"
                    placeholder={firstName}
                    type="text"
                    value={updateFirstName}
                    onChange={handleChangeUpdateFirstName}
                  />
                </label>
                <button type="submit">Confirmer la mise à jour</button>
                <button type="button" onClick={() => setUpdateForm(!updateForm)}>Annuler la mise à jour</button>
              </form>
              )}

            </div>
          </div>
          <div className="Profil-Actions">
            <button
              onClick={() => {
                setUpdateForm(true);
                console.log('mon token => ', token);
              }}
              type="button"
              className="bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >Modifier le profil
            </button>
            <button type="button" className="bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Consulter mes randonnées</button>
          </div>
        </div>
      </div>
      <Map />
    </>
  );
}

Profil.propTypes = {
  token: PropTypes.object.isRequired,
};
export default Profil;
