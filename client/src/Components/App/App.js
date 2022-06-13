import './App.scss';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import LoginForm from '../LoginForm/LoginForm';
import SearchBar from '../SearchBar/SearchBar';
import RegisterForm from '../RegisterForm/RegisterForm';
import Profil from '../Profil/Profil';

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div className="App">
      <div className="main">
        <Header isLogged={isLogged} setIsLogged={setIsLogged} />
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
