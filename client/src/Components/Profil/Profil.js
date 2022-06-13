import './Profil.scss';

function Profil() {
  return (
    <div className="Profil">
      <h1 className="Profil-Greetings">Bonjour Username</h1>
      <div className="Profil-Dashboard">
        <div className="Profil-Informations">
          <h2>Votre Profil:</h2>
        </div>
        <div className="Profil-Actions">
          <button type="button">Modifier le profil</button>
          <button type="button">Consulter mes randonnées</button>
        </div>
      </div>
    </div>
  );
}

export default Profil;
