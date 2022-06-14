import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

function LoginForm({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loggedUser, setLoggedUser] = useState({});
  const navigate = useNavigate();

  // CODER L'APPEL A l'API -->
  return (
    <form
      className="LoginForm"
      onSubmit={(event) => {
        event.preventDefault();

        // A REVOIR AVEC LE BACK POUR JWTOKEN ET /auth/connect
        console.log(email);
        console.log(password);

        axios.post('http://141.94.207.7:8080/api/auth/login', { email: email, password: password })
          .then((res) => {
            const token = res.data;
            setToken(token);
            navigate('/profil');
          })
          .catch((error) => {
            swal('Votre Email ou votre Mot de passe est incorrect');
            console.log(error);
          });
      }}

    >
      <input
        className="LoginForm--input"
        placeholder="Email"
        type="email"
        required
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        className="LoginForm--input"
        placeholder="Password"
        type="password"
        required
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button className="LoginForm--button bg-stone-500 text-white active:bg-stone-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit">Envoyer</button>
    </form>
  );
}

LoginForm.propTypes = {

  setToken: PropTypes.func.isRequired,
};

export default LoginForm;
