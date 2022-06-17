import PropTypes from 'prop-types';
import './Trek.scss';

function Trek({ data }) {
  console.log('Data dans TREK composant:', data);
  return (
    <div className="Trek">
      <figure className="imgTrek">
        {data.pictures ? <img src={data.pictures[0]} alt="Illustration Trek" /> : <img src="" alt="Illustration Trek" /> }
        {/* <img src={data.pictures[0]} alt="Illustration Trek" /> */}
      </figure>
      <header>{data.title}</header>
      <main>{data.description}</main>
      <footer>Bouton pour voir la Trek en détail</footer>
    </div>
  );
}

Trek.propTypes = {
  data: PropTypes.object.isRequired,
};
export default Trek;
