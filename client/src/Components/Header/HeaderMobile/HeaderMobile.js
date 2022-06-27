import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import authentification from '../../../utils/sessionUser/sessionUser';

function HeaderMobile({
  setMenuOpen,
}) {
  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isLogged = localStorage.getItem('isLogged');
  return (
    <div className="Header-burger-menu-content">
      <p
        className="Header-burger-menu-content-close"
        onClick={closeMenu}
      >X
      </p>
      <ul className="Header-burger-menu-content-ul">
        <Link to="/" onClick={closeMenu}><li className="Header-burger-menu-content-li">Accueil</li></Link>
        <Link to="/register" onClick={closeMenu}><li className="Header-burger-menu-content-li">Inscription</li></Link>

        {isLogged === 'true'
          ? (
            <Link
              to="/"
              className="Header--a ease-linear transform hover:scale-110 transition duration-150 px-6 inline"
              onClick={() => {
                setMenuOpen(false);
                authentification.disconnectUser();
              }}
            > Deconnexion
            </Link>
          )
          : <Link to="/login" onClick={closeMenu}><li className="Header-burger-menu-content-li">Connexion</li></Link>}
        <Link to="about" onClick={closeMenu}><li className="Header-burger-menu-content-li">A propos</li></Link>

      </ul>
    </div>
  );
}
HeaderMobile.propTypes = {
  setMenuOpen: PropTypes.func.isRequired,
};
export default HeaderMobile;
