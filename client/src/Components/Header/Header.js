import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.scss';

function Header({ setIsLogged, isLogged }) {
  if (isLogged === false) {
    return (
      <div className="Header">
        <h1 className="Header--website-title">Go For Walk</h1>
        <div className="Header--burger-menu space-y-2">
          <div className="w-8 h-0.5 bg-white" />
          <div className="w-8 h-0.5 bg-white" />
          <div className="w-8 h-0.5 bg-white" />
        </div>
        <Link to="/register" className="Header--a ease-linear transform hover:scale-110 transition duration-150 px-6 inline">Inscription</Link>
        <Link to="/login" className="Header--a ease-linear transform hover:scale-110 transition duration-150 px-6 inline">Connexion</Link>
        <Link to="/about" className="Header--a ease-linear transform hover:scale-110 transition duration-150 px-6 inline">A propos</Link>
      </div>
    );
  }
  return (
    <div className="Header">
      <h1 className="Header--website-title">Go For Walk</h1>
      <h1 className="Header--website-burger">Burger</h1>
      <Link to="/" className="Header--a ease-linear transform hover:scale-110 transition duration-150 px-6 inline" onClick={() => setIsLogged(!isLogged)}> Deconnexion</Link>
      <Link to="/profil" className="Header--a ease-linear transform hover:scale-110 transition duration-150 px-6 inline">Mon profil</Link>
      <Link to="/about" className="Header--a ease-linear transform hover:scale-110 transition duration-150 px-6 inline">A propos</Link>
    </div>
  );
}

Header.propTypes = {

  isLogged: PropTypes.bool.isRequired,
  setIsLogged: PropTypes.func.isRequired,
};

export default Header;
