// REVIEW OK -- Laurent

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import './RegisterForm.scss';
import api from '../../axios/request';

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
      onSubmit={async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
          swal('Votre mot de passe doit être identique');
        } else {
          const register = await api.register(firstName, lastName, email, password);
          if (register) {
            swal('Votre compte à bien été créé', 'vous pouvez maintenant vous connecter', 'success');
            navigate('/login');
          }
        }
      }}
    >
      <div className="RegisterForm--input-container">
        <h1 className="RegisterForm-h1">Création d'un profil personnel</h1>
        <label className="RegisterForm--label" htmlFor="email">
          <span className="RegisterForm--label--text">Adresse email :</span>
          <input
            className="RegisterForm--input shadow-lg rounded-md"
            placeholder="Votre adresse mail"
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </label>
        <label className="RegisterForm--label " htmlFor="name">
          <span className="RegisterForm--label--text">Nom de Famille :</span>
          <input
            className="RegisterForm--input shadow-lg rounded-md"
            placeholder="Votre Nom"
            id="name"
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
          <span className="RegisterForm--label--text">Prénom :</span>
          <input
            className="RegisterForm--input shadow-lg rounded-md"
            placeholder="Votre Prénom"
            id="firstname"
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
          <span className="RegisterForm--label--text">Mot de passe :</span>
          <input
            className="RegisterForm--input shadow-lg rounded-md"
            placeholder="Votre mot de passe"
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <label className="RegisterForm--label" htmlFor="confirmPassword">
          <span className="RegisterForm--label--text">Confirmer votre Mot de passe :</span>
          <input
            className="RegisterForm--input shadow-lg rounded-md"
            placeholder="Confirmer votre mot de passe"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />
        </label>
      </div>

      <div className="RegisterForm--button-container">
        <button className="RegisterForm--button bg-stone-500 text-white active:bg-stone-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit">Valider</button>
        <button
          className="RegisterForm--button bg-stone-500 text-white active:bg-stone-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
      </div>
    </form>

  );
}

export default RegisterForm;
