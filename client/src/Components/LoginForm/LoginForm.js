import './LoginForm.scss';
import { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// import swal from 'sweetalert';
import authentification from '../../utils/sessionUser/sessionUser';
import api from '../../axios/request';

function LoginForm({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loggedUser, setLoggedUser] = useState({});
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  return (

    <form
      className="LoginForm"
      onSubmit={async (event) => {
        event.preventDefault();
        try {
          const { data } = await api.login(email, password);
          if (data) {
            setToken(data);
            // on défini si l'utilisateur est connecté ou non dans le local storage
            authentification.setLoggin(data);
            navigate('/profil');
          }
        } catch (err) {
          console.log('ici', err);
        }
      }}
    >
      <div className="LoginForm-main-form">
        <h1 className="LoginForm-h1">Se connecter à votre profil personnel</h1>
        <input
          className="LoginForm--input shadow-lg rounded-md"
          placeholder="Email"
          type="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          className="LoginForm--input shadow-lg rounded-md"
          placeholder="Password"
          type="password"
          required
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

      </div>
      <div className="LoginForm--buttonGroup">
        <button className="LoginForm--button btnForm bg-stone-500 text-white active:bg-stone-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit">Envoyer</button>
        <button
          className="LoginForm--button btnForm bg-stone-500 text-white active:bg-stone-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={resetForm}
        >
          Réinitialiser
        </button>
      </div>
    </form>

  );
}

LoginForm.propTypes = {

  setToken: PropTypes.func.isRequired,
};

export default LoginForm;
