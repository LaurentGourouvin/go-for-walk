import './App.scss';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import LoginForm from '../LoginForm/LoginForm';
import SearchBar from '../SearchBar/SerachBar';

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div className="App">
      <div className="main">
        <Header isLogged={isLogged} setIsLogged={setIsLogged} />
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>

      </div>
    </div>
  );
}

export default App;
