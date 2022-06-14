import './MyTreks.scss';
// import de la data Statique
import data from '../../dataStatic/data_treks';
import Trek from '../Trek/Trek';

function MyTreks() {
  console.log('affichage de ma data dans myTreks', data);
  return (
    <>
      <h1 className="MyTreks-Title-1">Mes randonnées</h1>
      <div className="MyTreks">
        {
        data.map((trek) => <Trek data={trek} />)
        }
      </div>
    </>
  );
}

export default MyTreks;
