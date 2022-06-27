import './SearchBar.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function SearchBar({ setSearchCity }) {
  const [cityName, setCityName] = useState('');
  const navigate = useNavigate();
  const handleChangeCityName = (event) => {
    setCityName(event.target.value);
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();
    setSearchCity(cityName);
    setCityName('');
    navigate('/search');
  };

  return (
    <div className="SearchBar">
      <p className="SearchBar-description my-2">Rechercher une randonnée</p>
      <form onSubmit={handleSubmitForm}>

        <input
          type="text"
          className="SearchBar-cityNameInput rounded shadow-lg py-4 px-4 hover:shadow-xl"
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
