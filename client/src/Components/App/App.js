import './App.scss';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import LoginForm from '../LoginForm/LoginForm';
import SearchBar from '../SearchBar/SearchBar';
import RegisterForm from '../RegisterForm/RegisterForm';
import Profil from '../Profil/Profil';
import MyTreks from '../MyTreks/MyTreks';
import SearchResults from '../SearchResults/SearchResults';
import CreateTrekForm from '../CreateTrekForm/CreateTrekForm';
import TrekDetails from '../TrekDetails/TrekDetails';
import UpdateTrek from '../UpdateTrek/UpdateTrek';
import About from '../About/About';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  const [token, setToken] = useState({});
  const [searchCity, setSearchCity] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('isLogged') === 'true') {
      setIsLogged(true);
      setToken({ access_token: localStorage.getItem('access_token'), refresh_token: localStorage.getItem('refresh_token') });
    }
  }, [isLogged]);

  return (
    <div className="App">
      <div className="main">
        <Header token={token} setToken={setToken} isLogged={isLogged} setIsLogged={setIsLogged} />
        <Routes>
          <Route path="/" element={<SearchBar setSearchCity={setSearchCity} />} />
          <Route path="/login" element={<LoginForm setToken={setToken} setIsLogged={setIsLogged} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profil" element={<Profil token={token} setToken={setToken} isLogged={isLogged} setIsLogged={setIsLogged} />} />
          <Route path="/MyTreks" element={<MyTreks token={token} />} />
          <Route path="/search" element={<SearchResults searchCity={searchCity} token={token} />} />
          <Route path="/trek/create" element={<CreateTrekForm token={token} isLogged={isLogged} />} />
          <Route path="/trek/:id" element={<TrekDetails />} />
          <Route path="/updateTrek/:id" element={<UpdateTrek token={token} isLogged={isLogged} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
