import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Trek from '../Trek/Trek';
import './SearchResults.scss';
import api from '../../axios/request';

function SearchResults({ searchCity, token }) {
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    // si searchCity est vide je requête l'API pour recevoir TOUTES les randonnées
    setSearchResult('');
    if (searchCity === '') {
      try {
        // J'utilise des fonctions fléchées en mode ASYNCHRONE
        // Si on ne passe pas par la création de fléchée pour effectuer des méthodes asynchrones dans notre useEffect
        // React ne sera pas content et ça sera full erreur dans tout les sens.
        // Un peu de documentation : https://devtrium.com/posts/async-functions-useeffect
        const allTreks = async () => {
          const treks = await api.getAllTreks();
          if (treks) {
            setSearchResult(treks.data);
          }
        };
        allTreks();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const treksByCityName = async () => {
          const treks = await api.getTreksByCity(searchCity);
          if (treks) {
            setSearchResult(treks.data);
          }
        };
        treksByCityName();
      } catch (err) {
        console.log(err);
      }
    }
    // sinon je recupère toutes les randonnées en fonction searchCity
  }, []);
  return (
    <div className="SearchResults">
      <div className="SearchResults-header">
        <h1 className="SearchResults-Title-1">
          Résultats de votre recherche :
        </h1>
        <h2 className="SearchResults-Title-2">
          {searchCity ? `Pour la ville de ${searchCity}` : 'Pour la France entière'}
          <Link to="/"><p className="SearchResults-Subtitle">Retour accueil</p></Link>
        </h2>

      </div>
      <div className="SearchResults-cardContainer">
        {console.log('affichage de mon state', searchResult)}
        {searchResult.length === 0
          ? '' : searchResult.map((result) => <Trek key={result.id} data={result} token={token} />)}
      </div>
    </div>
  );
}
// Se baser sur data pour le moment ensuite se baser sur un state contenant les données

SearchResults.propTypes = {
  searchCity: PropTypes.string.isRequired,
  token: PropTypes.object.isRequired,
};
export default SearchResults;
