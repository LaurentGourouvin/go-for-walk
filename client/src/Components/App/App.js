import './App.scss';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import LoginForm from '../LoginForm/LoginForm';
import SearchBar from '../SearchBar/SearchBar';
import RegisterForm from '../RegisterForm/RegisterForm';
import Profil from '../Profil/Profil';
import MyTreks from '../MyTreks/MyTreks';
import SearchResults from '../SearchResults/SearchResults';
import CreateTrekForm from '../CreateTrekForm/CreateTrekForm';

function App() {
  const [token, setToken] = useState({});
  const [searchCity, setSearchCity] = useState('');

  return (
    <div className="App">
      <div className="main">
        <Header token={token} setToken={setToken} />
        <Routes>
          <Route path="/" element={<SearchBar setSearchCity={setSearchCity} />} />
          <Route path="/login" element={<LoginForm setToken={setToken} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profil" element={<Profil token={token} />} />
          <Route path="/MyTreks" element={<MyTreks />} />
          <Route path="/search" element={<SearchResults searchCity={searchCity} />} />
          <Route path="/trek/create" element={<CreateTrekForm token={token} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
