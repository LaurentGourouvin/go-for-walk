import PropTypes from 'prop-types';
import './Trek.scss';

function Trek({ data }) {
  console.log(data);
  return (
    <div className="Trek">
      <figure className="imgTrek">
        <img src={data.images[0]} alt="Illustration Trek" />
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
