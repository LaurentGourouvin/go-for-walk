import PropTypes from 'prop-types';
// import data from '../../dataStatic/data_treks';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Trek from '../Trek/Trek';
import './SearchResults.scss';

function SearchResults({ searchCity }) {
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    // si searchCity est vide je requête l'API pour recevoir TOUTES les randonnées
    setSearchResult('');
    const dataArray = [];
    if (searchCity === '') {
      console.log('Je dois afficher toutes les randonnées du site');
    } else {
      try {
        axios.get(`http://141.94.207.7:8080/api/treks/${searchCity}`)
          .then((res) => {
            const { data } = res;
            dataArray.push(data);
            setSearchResult(dataArray);
          });
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
          Pour la ville de {searchCity}
        </h2>
      </div>
      <div className="SearchResults-cardContainer">
        {console.log('affichage de mon state', searchResult)}
        {searchResult && searchResult.map((result) => <Trek data={result} />) }
      </div>
    </div>
  );
}
// Se baser sur data pour le moment ensuite se baser sur un state contenant les données

SearchResults.propTypes = {
  searchCity: PropTypes.string.isRequired,
};
export default SearchResults;
