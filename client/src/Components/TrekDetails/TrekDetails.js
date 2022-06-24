import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './TrekDetails.scss';
import MapTrek from '../MapTrek/MapTrek';

function TrekDetails() {
  const { id } = useParams();
  const [trekData, setTrekData] = useState({});
  const [trekDataPictures, setTrekDataPictures] = useState([]);
  const [mapCoordinate, setMapCoordinate] = useState([[], []]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios.get(`http://141.94.207.7:8080/api/treks/${id}`)
        .then((res) => {
          const { data } = res;
          setTrekData(data);
          setTrekDataPictures(res.data.pictures);
          const mapPoint = [];
          mapPoint.push([parseInt(data.coordinate[0], 10), parseInt(data.coordinate[1], 10)]);
          mapPoint.push([parseInt(data.coordinate[2], 10), parseInt(data.coordinate[3], 10)]);
          setMapCoordinate(mapPoint);
          console.log('information de la randonnée:', data);
          console.log('tableau des coordonées', mapPoint);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (

    <div className="TrekDetails">
      <button className="TrekDetails-button bg-stone-500 text-white active:bg-stone-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => { navigate(-1); }}>Retour au résultats de la recherche</button>
      <div className="TrekDetails-container-head">
        <div className="TrekDetails-container-head-left">
          <h1 className="TrekDetails-h1">"{trekData.title}"
          </h1>
          <div className="TrekDetails-container-info">
            <span className="TrekDetails-info">
              La Difficulté : {trekData.difficulty_id}
            </span>

            <span className="TrekDetails-info">
              La Durée:  {trekData.duration}
            </span>

            <span className="TrekDetails-info">
              La Distance:  {trekData.distance}
            </span>
          </div>
        </div>
        <div className="TrekDetails-container-head-right">

          {mapCoordinate.length > 0 ? <MapTrek mapCoordinate={mapCoordinate} /> : ''}
        </div>
      </div>
      <div className="TrekDetails-container-main">
        <div className="TrekDetails-container-img">
          { trekDataPictures.map((picture) => <img key={picture} src={picture} alt={picture} />)}
        </div>
        <p className="TrekDetails-description">
          {trekData.description}
        </p>
      </div>
    </div>

  );
}

export default TrekDetails;
