import { useEffect, useState } from 'react';
import './Profil.scss';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import authentification from '../../utils/sessionUser/sessionUser';
import ImageWarning from './images/warning.png';
import api from '../../axios/request';

function Profil({
  token, setToken, setIsLogged, isLogged,
}) {
  const navigate = useNavigate();

  // State initial du composant
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [password, setPassword] = useState('');
  const [updateForm, setUpdateForm] = useState(false);

  // State pour les informations relatives à l'update des données
  const [updateName, setUpdateName] = useState('');
  const [updateFirstName, setUpdateFirstName] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updatePassword, setUpdatePassword] = useState('');

  let decodedToken = null;
  let userId = null;

  // Fonction lors de la soumission du formulaire
  const handleUpdateForm = async (e) => {
    e.preventDefault();
    if (token.access_token) {
      decodedToken = jwtDecode(token.access_token);
      userId = decodedToken.userId;
    }
    const errorOnSubmitForm = [];

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
            title: 'Mise à jour effectuée',
            icon: 'success',
          });
          setFirstName(updateFirstName);
          setName(updateName);
          setEmail(updateEmail);
        } else {
          swal({
            title: 'Problème lors de la mise à jour des données',
            icon: 'error',
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
      if (token.access_token) {
        decodedToken = jwtDecode(token.access_token);
        userId = decodedToken.userId;
      } else {
        decodedToken = jwtDecode(localStorage.getItem('access_token'));
        userId = decodedToken.userId;
      }

      const getUser = async (id) => {
        const user = await api.getUser(id);
        if (user) {
          setEmail(user.data.email);
          setName(user.data.name);
          setFirstName(user.data.firstname);
          setPassword(user.data.password);
          setIsLogged(true);
        }
      };
      getUser(userId);
    } catch (err) {
      console.error(err);
    }
  }, [isLogged]);

  // Si l'utilisateur est connecté on lui affiche son dashboard
  if (!isLogged) {
    return (
      <p className="msg-error p-2 bg-amber-50 rounded-md shadow-md"><img src={ImageWarning} alt="logo de warning" />Vous devez être connecté pour accéder à la page profil</p>
    );
  }
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
                <h2 className="Profil-informations-h2">Adresse Email</h2>
                <hr />
                <p className="Profil-informations-description">{email}</p>
                <h2 className="Profil-informations-h2">Nom</h2>
                <hr />
                <p className="Profil-informations-description">{name}</p>
                <h2 className="Profil-informations-h2">Prénom</h2>
                <hr />
                <p className="Profil-informations-description">{firstName}</p>
              </>
              )}
              {updateForm && (
              <form className="Profil-form" onSubmit={handleUpdateForm}>
                <label className="Profil-label" htmlFor="email">
                  <span className="Profil-span">Email:</span>
                  <input
                    className="Profil-input shadow-lg rounded-md"
                    placeholder={email}
                    type="email"
                    value={updateEmail}
                    onChange={handleChangeUpdateEmail}
                  />
                </label>
                <label className="Profil-label" htmlFor="password">
                  <span className="Profil-span">Password:</span>
                  <input
                    id="password"
                    name="password"
                    className="Profil-input shadow-lg rounded-md"
                    placeholder="mot de passe"
                    type="password"
                    value={updatePassword}
                    onChange={handleChangeUpdatePassword}
                  />
                </label>
                <label className="Profil-label" htmlFor="name">
                  <span className="Profil-span">Name:</span>
                  <input
                    id="name"
                    name="name"
                    className="Profil-input shadow-lg rounded-md"
                    placeholder={name}
                    type="text"
                    value={updateName}
                    onChange={handleChangeUpdateName}
                  />
                </label>
                <label className="Profil-label" htmlFor="firstname">
                  <span className="Profil-span">Firstname:</span>
                  <input
                    id="firstname"
                    name="firstname"
                    className="Profil-input shadow-lg rounded-md"
                    placeholder={firstName}
                    type="text"
                    value={updateFirstName}
                    onChange={handleChangeUpdateFirstName}
                  />
                </label>
                <div className="Profil-buttons-group">
                  <button className="bg-stone-500 text-white hover:bg-stone-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit">Confirmer la mise à jour</button>
                  <button
                    className="bg-stone-500 text-white hover:bg-stone-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setUpdateForm(!updateForm);
                      setUpdateName('');
                      setUpdatePassword('');
                      setUpdateFirstName('');
                      setUpdateEmail('');
                    }}
                  >
                    Annuler la mise à jour
                  </button>
                </div>

              </form>
              )}

            </div>
          </div>
          <div className="Profil-Actions">
            <button
              onClick={() => {
                setUpdateFirstName(firstName);
                setUpdateEmail(email);
                setUpdateName(name);
                setUpdateForm(true);
              }}
              type="button"
              className="bg-stone-500 text-white active:bg-stone-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >Modifier le profil
            </button>
            <button
              type="button"
              className="bg-stone-500 text-white active:bg-stone-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              onClick={() => { navigate('/MyTreks'); }}
            >
              Consulter mes randonnées
            </button>
            <button
              onClick={async () => {
                try {
                  decodedToken = jwtDecode(token.access_token);
                  userId = decodedToken.userId;
                  const disableUser = await api.disableUser(userId, token);
                  if (disableUser.status === 200) {
                    setToken({});
                    setIsLogged(false);
                    authentification.disconnectUser();
                    swal('Votre compte a bien était désactivé, si vous souhaité que vos données ne soit pas conservé veuillez contacter l\'administreteur du site', '', 'success');
                    navigate('/');
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
              type="button"
              className="bg-stone-500 text-white active:bg-stone-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
              Désactiver votre compte
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

Profil.propTypes = {
  token: PropTypes.object.isRequired,
  setToken: PropTypes.func.isRequired,
  setIsLogged: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
};
export default Profil;

// Review ok ( Dorian )
