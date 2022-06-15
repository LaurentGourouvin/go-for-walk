import data from '../../dataStatic/data_treks';
import Trek from '../Trek/Trek';
import './SearchResults.scss';

function SearchResults() {
  const cityName = 'VilleENDur';
  return (
    <div className="SearchResults">
      <div className="SearchResults-header">
        <h1 className="SearchResults-Title-1">
          Résultats de votre recherche :
        </h1>
        <h2 className="SearchResults-Title-2">
          Pour la ville de {cityName}
        </h2>
      </div>
      <div className="SearchResults-cardContainer">

        {data.map((result) => <Trek data={result} />)}
      </div>
    </div>
  );
}
// Se baser sur data pour le moment ensuite se baser sur un state contenant les données

export default SearchResults;
