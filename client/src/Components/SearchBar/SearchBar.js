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
      <form onSubmit={handleSubmitForm}>
        <input
          type="text"
          placeholder="Saisir le nom d'une ville"
          value={cityName}
          onChange={handleChangeCityName}
        />
      </form>
    </div>
  );
}

export default SearchBar;
