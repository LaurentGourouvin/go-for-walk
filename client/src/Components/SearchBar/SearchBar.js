import './SearchBar.scss';
import { useState } from 'react';

function SearchBar() {
  const [cityName, setCityName] = useState('');

  const handleChangeCityName = (event) => {
    setCityName(event.target.value);
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();
    // coder l'appel à l'API du gouvernement pour récupérer le nom de la bonne ville.
    setCityName('');
  };

  return (
    <div className="SearchBar">
      <p className="SearchBar-description my-2">Rechercher une randonnée via la barre de recherche</p>
      <form onSubmit={handleSubmitForm}>

        <input
          type="text"
          className="SearchBar-cityNameInput rounded shadow-lg py-4 px-4 w-96 hover:shadow-xl"
          placeholder="Saisir le nom d'une ville"
          value={cityName}
          onChange={handleChangeCityName}
        />
      </form>
    </div>
  );
}

export default SearchBar;
