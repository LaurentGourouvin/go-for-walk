// import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './TrekDetails.scss';
import MapTrek from '../MapTrek/MapTrek';
import api from '../../axios/request';

function TrekDetails() {
  const { id } = useParams();
  const [trekData, setTrekData] = useState({});
  const [trekDataPictures, setTrekDataPictures] = useState([]);
  const [mapCoordinate, setMapCoordinate] = useState([[], []]);
  const [difficultyLabel, setDifficultyLabel] = useState('');
  const [startMarker, setStartMarker] = useState('');
  const [endMarker, setEndMarker] = useState();
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const getTrekById = async (trekId) => {
        const trek = await api.getTrekById(trekId);
        if (trek.status === 200) {
          setTrekData(trek.data);
          setTrekDataPictures(trek.data.pictures);

          // Création d'un tableau contenant les coordonées de la randonnée afin de la dessiner sur Leaflet
          const mapPoint = [];
          mapPoint.push([trek.data.coordinate[0], trek.data.coordinate[1]]);
          mapPoint.push([trek.data.coordinate[2], trek.data.coordinate[3]]);
          setMapCoordinate(mapPoint);

          // Création d'un OBJ contenant LAT et LNG pour les coordonées du market sur Leaflet
          const positionStartMarker = {
            lat: Number(trek.data.coordinate[0]),
            lng: Number(trek.data.coordinate[1]),
          };
          setStartMarker(positionStartMarker);

          // Création d'un OBJ contenant LAT et LNG pour les coordonées du market sur Leaflet
          const positionEndMarker = {
            lat: Number(trek.data.coordinate[2]),
            lng: Number(trek.data.coordinate[3]),
          };
          setEndMarker(positionEndMarker);

          const getLabelById = async (labelId) => {
            const label = await api.getLabelById(labelId);
            if (label.status === 200) {
              setDifficultyLabel(label.data.label);
            }
          };
          getLabelById(trek.data.difficulty_id);
          setIsLoading(true);
        }
      };
      getTrekById(id);
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <div className="TrekDetails-info-content"> La Difficulté : {difficultyLabel}</div>
            </span>

            <span className="TrekDetails-info">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="TrekDetails-info-content"> La Durée:  {trekData.duration} Minutes</div>
            </span>

            <span className="TrekDetails-info">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <div className="TrekDetails-info-content"> La Distance:  {trekData.distance} Km</div>
            </span>

            <span className="TrekDetails-info">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="TrekDetails-info-content"> La Localisation:  {trekData.city} </div>
            </span>
          </div>
        </div>
        <div className="TrekDetails-container-head-right">

          {loading && <MapTrek mapCoordinate={mapCoordinate} startMarker={startMarker} endMarker={endMarker} /> }
        </div>
      </div>
      <div className="TrekDetails-container-main">
        <div className="TrekDetails-container-img">
          { trekDataPictures.map((picture) => <img className="TrekDetails-img" key={picture} src={picture} alt={picture} />)}
        </div>
        <p className="TrekDetails-description">
          {trekData.description}
        </p>
      </div>
    </div>

  );
}

export default TrekDetails;

// Review ok ( Dorian )
