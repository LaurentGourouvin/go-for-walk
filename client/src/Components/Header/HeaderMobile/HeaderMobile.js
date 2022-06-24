import PropTypes from 'prop-types';

function HeaderMobile({ setMenuOpen }) {
  return (
    <div className="Header-burger-menu-content">
      <p
        className="Header-burger-menu-content-close"
        onClick={() => {
          setMenuOpen(false);
        }}
      >X
      </p>
      <ul className="Header-burger-menu-content-ul">
        <li className="Header-burger-menu-content-li">Accueil</li>
        <li className="Header-burger-menu-content-li">Inscription</li>
        <li className="Header-burger-menu-content-li">Connexion</li>
        <li className="Header-burger-menu-content-li">A propos</li>
      </ul>
    </div>
  );
}
HeaderMobile.propTypes = {
  setMenuOpen: PropTypes.func.isRequired,
};
export default HeaderMobile;
