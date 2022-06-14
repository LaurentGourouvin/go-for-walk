import './Profil.scss';
// data static pour conception du composant
import data from '../../dataStatic/data_profil';

function Profil() {
  return (
    <>
      <h1 className="Profil-h1">Bonjour {data.firstname} {data.name}</h1>

      <div className="Profil">
        <div className="Profil-Dashboard">
          <div className="Profil-Informations">
            <h2 className="Profil-h2">Votre Profil</h2>
            <div className="Profil-Informations-Card m-7 p-6 max-w-sm bg-white/[.9] rounded-lg border border-white shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg">
              <p>nom utilisateur: {data.email}</p>

              <p>nom: {data.name}</p>
              <p>prenom: {data.firstname}</p>

            </div>
          </div>
          <div className="Profil-Actions">
            <button type="button" className="bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Modifier le profil</button>
            <button type="button" className="bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Consulter mes randonnées</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profil;
