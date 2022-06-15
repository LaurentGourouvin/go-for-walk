import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from './images/logo.png';
import './Header.scss';
import authentification from '../../utils/sessionUser/sessionUser';

function Header({ token }) {
  if (!token.access_token) {
    return (
      <div className="Header">
        <Link to="/">
          <h1 className="Header--website-title"><img className="Header--Logo" src={logo} alt="Go For Walk Logo Website" /></h1>
        </Link>
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
      <Link to="/">
        <h1 className="Header--website-title"><img className="Header--Logo" src={logo} alt="Go For Walk Logo Website" /></h1>
      </Link>
      <h1 className="Header--website-burger">Burger</h1>
      {/* <Link to="/" className="Header--a ease-linear transform hover:scale-110 transition duration-150 px-6 inline" onClick={() => setToken({})}> Deconnexion</Link> */}
      <Link to="/" className="Header--a ease-linear transform hover:scale-110 transition duration-150 px-6 inline" onClick={() => authentification.disconnectUser()}> Deconnexion</Link>
      <Link to="/profil" className="Header--a ease-linear transform hover:scale-110 transition duration-150 px-6 inline">Mon profil</Link>
      <Link to="/about" className="Header--a ease-linear transform hover:scale-110 transition duration-150 px-6 inline">A propos</Link>
    </div>
  );
}

Header.propTypes = {

  token: PropTypes.object.isRequired,
  // setToken: PropTypes.func.isRequired,
};

export default Header;
