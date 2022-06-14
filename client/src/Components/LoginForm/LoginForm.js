import './LoginForm.scss';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedUser, setLoggedUser] = useState({});
  const navigate = useNavigate();

  // CODER L'APPEL A l'API -->
  return (
    <div className="main">
      <form
        className="LoginForm"
        onSubmit={(event) => {
          event.preventDefault();

          // A REVOIR AVEC LE BACK POUR JWTOKEN ET /auth/connect

          axios.get('http://141.94.207.7:8080/api/auth')
            .then((res) => {
              const { data } = res;
              console.log('affichage des data', data);
              console.log('affichage de la req axios', res);
              const user = data.find((oneUser) => oneUser.email.toLowerCase() === email.toLowerCase()
                && oneUser.password === password);

              console.log("j'affiche ma recherche du find", user);

              if (user) {
                setLoggedUser(user);
              }
              console.log(loggedUser);
            })
            .catch((error) => console.log(error))
            .finally(() => {
              navigate('/profil');
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
    </div>

  );
}

export default LoginForm;
