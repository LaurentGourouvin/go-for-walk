import './App.scss';
import { useState } from 'react';
import Header from '../Header/Header';

function App() {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <div className="App">
      <p>Hello World</p>
      <Header isLogged={isLogged} setIsLogged={setIsLogged} />
    </div>

  );
}

export default App;
