import './App.scss';
import { useState } from 'react';
import Header from '../Header/Header';

function App() {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <div className="App">
      <div className="main">
        <Header isLogged={isLogged} setIsLogged={setIsLogged} />
      </div>
    </div>
  );
}

export default App;
