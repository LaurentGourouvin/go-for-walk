import PropTypes from 'prop-types';
import './Trek.scss';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import api from '../../axios/request';

function Trek({ data, token, setTreksByUserId }) {
  const [userId, setUserId] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token.access_token) {
      const decodedToken = jwtDecode(token.access_token);
      setUserId(decodedToken.userId);
    }
  }, []);
  return (
    <div className="Trek hover:shadow-lg">
      <header>{data.title}</header>
      <hr className="Trek-hr" />
      <figure className="imgTrek">
        {data.pictures ? <img src={data.pictures[0]} alt="Illustration Trek" /> : <img src="" alt="Illustration Trek" /> }
        {/* <img src={data.pictures[0]} alt="Illustration Trek" /> */}
      </figure>

      <main>{data.description}</main>

      <div className="Trek-buttons-group">
        <Link to={`/trek/${data.id}`}>
          <footer className="bg-green-900 text-white active:bg-green-900 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
            Voir le détail de la randonée
          </footer>
        </Link>
        {
      userId === data.user_id && location.pathname === '/MyTreks'
        ? (
          <Link to={`/updateTrek/${data.id}`}>
            <button
              className="Trek-button bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => {

              }}
            >Modifier la randonnée
            </button>
          </Link>
        )
        : ''
    }
        {
      userId === data.user_id && location.pathname === '/MyTreks'
        ? (
          <button
            className="Trek-button bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => {
              swal('Voulez vous supprimer la randonée?', `${data.title}`, {
                buttons: {
                  cancel: 'Annuler la suppression',
                  delete: {
                    text: 'Supprimer la randonnée',
                    value: 'delete',
                  },

                },
              })
                .then(async (choice) => {
                  switch (choice) {
                    case 'delete': {
                      const deleteTrek = await api.deleteTrek(data.id, token);
                      if (deleteTrek === null) {
                        swal("La randonnée n'a pas été supprimée", '', 'warning');
                        break;
                      }
                      swal(`${data.title} a bien été supprimée`, '', 'success');
                      const treksUpdate = await api.getTreksByUserId(userId);
                      setTreksByUserId(treksUpdate.data);
                      navigate('/MyTreks');
                      break;
                    }

                    default:
                      swal("La randonnée n'a pas été supprimée", '', 'warning');
                  }
                });
            }}
          >Supprimer la randonnée
          </button>
        )
        : ''
    }
      </div>
    </div>
  );
}

Trek.propTypes = {
  data: PropTypes.object.isRequired,
  token: PropTypes.object.isRequired,
  setTreksByUserId: PropTypes.func,
};
Trek.defaultProps = {
  setTreksByUserId: PropTypes.func,
};
export default Trek;
