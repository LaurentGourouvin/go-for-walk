import PropTypes from 'prop-types';
import './Trek.scss';
import { Link } from 'react-router-dom';

function Trek({ data }) {
  console.log('Data dans TREK composant:', data);
  return (
    <div className="Trek hover:shadow-lg">
      <header>{data.title}</header>
      <hr className="Trek-hr" />
      <figure className="imgTrek">
        {data.pictures ? <img src={data.pictures[0]} alt="Illustration Trek" /> : <img src="" alt="Illustration Trek" /> }
        {/* <img src={data.pictures[0]} alt="Illustration Trek" /> */}
      </figure>

      <main>{data.description}</main>
      <Link to={`/trek/${data.id}`}>
        <footer className="bg-green-900 text-white active:bg-green-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
          Voir le détail de la randonée
        </footer>
      </Link>
      <button
        className="Trek-button bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
      >Supprimer la randonnée
      </button>
    </div>
  );
}

Trek.propTypes = {
  data: PropTypes.object.isRequired,
};
export default Trek;
