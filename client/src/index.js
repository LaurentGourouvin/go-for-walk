import ReactDOM from 'react-dom/client';
import './styles/dist/index.scss';
import { BrowserRouter } from 'react-router-dom';
import App from './Components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>

    <App />

  </BrowserRouter>,
);
