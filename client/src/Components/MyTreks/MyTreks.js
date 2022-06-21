import './MyTreks.scss';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Trek from '../Trek/Trek';
import authentification from '../../utils/sessionUser/sessionUser';
import ImageWarning from './images/warning.png';
import api from '../../axios/request';

function MyTreks({ token }) {
  const isLogged = authentification.checkLoggin(token);
  const [treksByUserId, setTreksByUserId] = useState([]);

  if (!isLogged) {
    return (
      <p className="msg-error p-2 bg-amber-50 rounded-md shadow-md"><img src={ImageWarning} alt="logo de warning" />Vous devez être connecté pour consultez vos randonnées</p>
    );
  }
  let decodedToken = null;

  // fonction pour décoder le token dans le useEffect
  const decodeToken = async () => {
    if (token.access_token) {
      try {
        decodedToken = jwtDecode(token.access_token);
      } catch (error) {
        console.error(error);
      }
    }
    return decodedToken;
  };

  useEffect(() => {
    // Decode du Token
    decodeToken();
    if (decodedToken) {
    // fonction pour récupérer ma liste de treks dans le useEffect de manière asynchrone
      const getTreks = async () => {
        try {
          const treks = await api.getTreksByUserId(decodedToken.userId);
          console.log('treks de la bdd :', treks);
          if (treks) {
            setTreksByUserId(treks.data);
          }
        } catch (error) {
          console.error(error);
        }
      };
      getTreks();
    }
  }, []);
  return (
    <>
      <h1 className="MyTreks-Title-1">Mes randonnées</h1>
      <div className="MyTreks">
        {
        treksByUserId.map((trek) => <Trek key={trek.id} data={trek} token={token} setTreksByUserId={setTreksByUserId} />)
        }
      </div>
    </>
  );
}
MyTreks.propTypes = {
  token: PropTypes.object.isRequired,
};
export default MyTreks;
