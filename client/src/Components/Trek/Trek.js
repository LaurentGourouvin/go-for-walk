import PropTypes from 'prop-types';
import './Trek.scss';

function Trek({ data }) {
  console.log('Data dans TREK composant:', data);
  return (
    <div className="Trek">
      <figure className="imgTrek">
        {/* ATTENTION
        PENSEZ A GERER UN SOUCIS POSSIBLE VIA LA PROPRIETE PICTURES (tableau ou valeur NULL) */}
        {/* <img src={data.pictures[0]} alt="Illustration Trek" /> */}
      </figure>
      <header>{data.titre}</header>
      <main>{data.description}</main>
      <footer>Bouton pour voir la Trek en détail</footer>
    </div>
  );
}

Trek.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};
export default Trek;
