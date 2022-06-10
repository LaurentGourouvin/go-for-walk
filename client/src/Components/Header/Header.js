import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.scss';

function Header({ setIsLogged, isLogged }) {
  if (isLogged === false) {
    return (
      <div className="Header">
        <h1 className="Header--website-title">Go For Walk</h1>
        <Link to="/register" className="Header--a">Inscription</Link>
        <Link to="/login" className="Header--a">Connexion</Link>
        <Link to="/about" className="Header--a">A propos</Link>
      </div>
    );
  }
  return (
    <div className="Header">
      <h1 className="Header--website-title">Go For Walk</h1>
      <Link to="/" className="Header--a" onClick={() => setIsLogged(!isLogged)}> Deconnexion</Link>
      <Link to="/profil" className="Header--a">Mon profil</Link>
      <Link to="/about" className="Header--a">A propos</Link>
    </div>
  );
}

Header.propTypes = {

  isLogged: PropTypes.bool.isRequired,
  setIsLogged: PropTypes.func.isRequired,
};

export default Header;
