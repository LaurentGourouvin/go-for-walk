import { Link } from 'react-router-dom';
import './PageNotFound.scss';
import Logo from './images/fox-forest-404.png';

function PageNotFound() {
  return (
    <div className="PageNotFound">
      <div className="PageNotFound-left">
        <img className="" src={Logo} alt="404" />
      </div>
      <div className="PageNotFound-right">
        <h1 className="PageNotFound-title">Vous vous êtes perdu ?</h1>
        <Link to="/"><button className="bg-stone-500 text-white hover:bg-stone-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Retour à l'accueil</button></Link>
      </div>
    </div>

  );
}

export default PageNotFound;
