import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import logo from './images/logo.png';
import './Header.scss';
import authentification from '../../utils/sessionUser/sessionUser';
import HeaderMobile from './HeaderMobile/HeaderMobile';

function Header({ setToken, isLogged, setIsLogged }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Affichage du menu en mode déconnecté
  if (!isLogged) {
    return (
      <>
        <div className="Header">
          <Link to="/">
            <h1 className="Header--website-title"><img className="Header--Logo" src={logo} alt="Go For Walk Logo Website" /></h1>
          </Link>
          <div className="Header--burger-control-menu space-y-2">
            {!menuOpen
                && (
                <Link
                  to="#"
                  className="Header-ligne-icone-burger"
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}
                >
                  ☰
                </Link>
                )}

          </div>
          {menuOpen && <HeaderMobile setMenuOpen={setMenuOpen} />}
          <div className="Header-menu">
            <Link to="/register" className="Header--a ease-linear transform hover:scale-110 transition duration-150 px-6 inline">Inscription</Link>
            <Link to="/login" className="Header--a ease-linear transform hover:scale-110 transition duration-150 px-6 inline">Connexion</Link>
            <Link to="/about" className="Header--a ease-linear transform hover:scale-110 transition duration-150 px-6 inline">A propos</Link>
          </div>
        </div>
        <div className="Header-logo-mobile">
          <Link to="/"><img className="Header-img-logo-mobile" src={logo} alt="Go For Walk Logo Website" /></Link>
        </div>
      </>
    );
  }

  // Affichage du menu lorsque l'on est connecté
  return (
    <>
      <div className="Header">
        <Link to="/">
          <h1 className="Header--website-title"><img className="Header--Logo" src={logo} alt="Go For Walk Logo Website" /></h1>
        </Link>
        {menuOpen && <HeaderMobile setMenuOpen={setMenuOpen} />}
        <div className="Header--burger-control-menu space-y-2">
          {!menuOpen
                  && (
                  <Link
                    to="#"
                    className="Header-ligne-icone-burger"
                    onClick={() => {
                      setMenuOpen(!menuOpen);
                    }}
                  >
                    ☰
                  </Link>
                  )}

        </div>
        <div className="Header-menu">
          <Link to="/trek/create" className="Header--a ease-linear transform hover:scale-110 transition duration-150 px-6 inline"> Créer une Randonnée</Link>

          <Link
            to="/"
            className="Header--a ease-linear transform hover:scale-110 transition duration-150 px-6 inline"
            onClick={() => {
              setToken({});
              setIsLogged(false);
              authentification.disconnectUser();
            }}
          > Deconnexion
          </Link>

          <Link to="/profil" className="Header--a ease-linear transform hover:scale-110 transition duration-150 px-6 inline">Mon profil</Link>
          <Link to="/about" className="Header--a ease-linear transform hover:scale-110 transition duration-150 px-6 inline">A propos</Link>
        </div>

      </div>
      <div className="Header-logo-mobile">
        <Link to="/"><img className="Header-img-logo-mobile" src={logo} alt="Go For Walk Logo Website" /></Link>
      </div>
    </>
  );
}

Header.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  setIsLogged: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
};

export default Header;
