import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import './RegisterForm.scss';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  return (
    <form
      className="RegisterForm"
      onSubmit={(event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
          swal('Votre mot de passe doit être identique');
        } else {
          axios.post('http://141.94.207.7:8080/api/auth/register', {
            firstname: firstName, name: lastName, email: email, password: password,
          })
            .then((res) => {
              console.log(res);
              swal('Votre compte à bien était créé', 'vous pouvez maintenant vous connecter', 'success');
              navigate('/login');
            })
            .catch((error) => {
              swal('Cette Email est déjà utilisé');
              console.log(error);
            });
        }
      }}
    >
      <div className="RegisterForm--input-container">

        <label className="RegisterForm--label" htmlFor="email">
          Adresse mail :
          <input
            className="RegisterForm--input"
            placeholder="Votre adresse mail"
            name="email"
            type="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </label>
        <label className="RegisterForm--label" htmlFor="name">
          Nom de Famille :
          <input
            className="RegisterForm--input"
            placeholder="Votre Nom"
            name="name"
            type="text"
            required
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </label>
        <label className="RegisterForm--label" htmlFor="firstname">
          Prénom :
          <input
            className="RegisterForm--input"
            placeholder="Votre Prénom"
            name="firstname"
            type="text"
            required
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
        </label>
        <label className="RegisterForm--label" htmlFor="password">
          Mot de passe :
          <input
            className="RegisterForm--input"
            placeholder="Votre mot de passe"
            name="password"
            type="text"
            required
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <label className="RegisterForm--label" htmlFor="confirmPassword">
          Confirmé votre Mot de passe :
          <input
            className="RegisterForm--input"
            placeholder="Confirmer votre mot de passe"
            name="confirmPassword"
            type="text"
            required
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />
        </label>
      </div>

      <div className="RegisterForm--button-container">
        <button
          type="button"
          onClick={() => {
            setEmail('');
            setFirstName('');
            setLastName('');
            setPassword('');
            setConfirmPassword('');
          }}
        >Réinitialiser le formulaire
        </button>
        <button className="RegisterForm--button" type="submit">Validez</button>
      </div>
    </form>

  );
}

export default RegisterForm;
