import './SearchBar.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';

function SearchBar({ setSearchCity }) {
  const [cityName, setCityName] = useState('');

  const handleChangeCityName = (event) => {
    setCityName(event.target.value);
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();
    setSearchCity(cityName);
    setCityName('');
  };

  return (
    <div className="SearchBar">
      <p className="SearchBar-description my-2">Rechercher une randonnée</p>
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

SearchBar.propTypes = {
  setSearchCity: PropTypes.func.isRequired,
};
export default SearchBar;
