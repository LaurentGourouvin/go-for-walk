import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.scss';

function Header({ setIsLogged, isLogged }) {
  if (isLogged === false) {
    return (
      <div className="Header">
        <Link to="/register">
          <button className="Header--button" type="button">Inscription</button>
        </Link>
        <Link to="/login">
          <button className="Header--button" type="button">Connexion</button>
        </Link>
        <Link to="/about">
          <button className="Header--button" type="button">A propos</button>
        </Link>
      </div>
    );
  }
  return (
    <div className="Header">
      <Link to="/">
        <button className="Header--button" type="button" onClick={() => setIsLogged(!isLogged)}>Deconnexion</button>
      </Link>
      <Link to="/trek/create">
        <button className="Header--button" type="button">Créer une randonnée</button>
      </Link>
      <Link to="/profil">
        <button className="Header--button" type="button">Mon profil</button>
      </Link>
      <Link to="/about">
        <button className="Header--button" type="button">A propos</button>
      </Link>
    </div>
  );
}

Header.propTypes = {

  isLogged: PropTypes.bool.isRequired,
  setIsLogged: PropTypes.func.isRequired,
};

export default Header;
