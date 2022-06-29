import 'leaflet/dist/leaflet.css';
import {
  MapContainer, TileLayer, useMapEvents, Marker, Popup, Polyline,
} from 'react-leaflet';
import L from 'leaflet';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import endIconMap from './images/end.png';
import startIconMap from './images/start.png';

function Map({
  setStartCoordinate, setEndCoordinate, defineStartOrEndPosition, setTrekPolyline, trekPolyline,
}) {
  // Je créer une fonction qui va être utiliser en tant que Composant pour Leaflet
  // Ce composant vas utiliser le hook useMapEvents afin de pouvoir accéder aux différentes
  // handler de Leaflet pour les interaction avec la MAP
  const [startMarker, setStartMarker] = useState({ lat: 0, lng: 0 });
  const [endMarker, setEndMarker] = useState({ lat: 0, lng: 0 });
  const [mapPoints, setMapPoints] = useState([[], []]);
  const [showLine, setShowLine] = useState(false);
  const [polyline, setPolyline] = useState([]);

  // Création d'ICON CUSTOM
  const endIcon = L.icon({
    iconUrl: endIconMap,
    iconSize: [40, 40],
  });
  const startIcon = L.icon({
    iconUrl: startIconMap,
    iconSize: [40, 40],
  });

  function GetStartEndPostionLatLgt() {
    // Je créer une variable me permettant d'utiliser le useMapEvents()
    // eslint-disable-next-line no-unused-vars
    const map = useMapEvents({
      // Une fois l'appel du HOOKS, je surchage sa config avec {}.
      // Je surchage la méthode "Click" afin de pouvoir obtenir la position lors du Click et je modifie mon state
      // avec les nouvelles valeurs
      click: (e) => {
        const { lat, lng } = e.latlng; // https://leafletjs.com/reference.html#handler

        if (defineStartOrEndPosition === 'start') {
          setStartCoordinate({ lat, lng });
          setStartMarker({ lat, lng });
          const lineToDraw = trekPolyline;
          lineToDraw[0][0] = lat;
          lineToDraw[0][1] = lng;

          setTrekPolyline(lineToDraw);
          setMapPoints(lineToDraw);
        }
        if (defineStartOrEndPosition === 'end') {
          setEndCoordinate({ lat, lng });
          setEndMarker({ lat, lng });

          const lineToDraw = trekPolyline;
          lineToDraw[1][0] = lat;
          lineToDraw[1][1] = lng;

          setTrekPolyline(lineToDraw);
          setMapPoints(lineToDraw);
        }
      },
    });
  }

  useEffect(() => {
    setShowLine(false);
    if (mapPoints[0].length === 2) {
      if (mapPoints[1].length === 2) {
        const lines = polyline;
        lines.push(<Polyline positions={mapPoints} />);
        setPolyline(lines);
        setShowLine(true);
      }
    }
  }, [startMarker, endMarker]);

  return (

    <MapContainer key={Math.random()} center={[47.159840, 3.164063]} zoom={6} scrollWheelZoom id="map">

      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GetStartEndPostionLatLgt />
      <Marker position={startMarker} icon={startIcon}>
        <Popup>Point de départ</Popup>
      </Marker>
      <Marker position={endMarker} icon={endIcon}>
        <Popup>Point d'arrivée</Popup>
      </Marker>

      {showLine && polyline[polyline.length - 1]}

    </MapContainer>
  );
}

Map.propTypes = {
  setStartCoordinate: PropTypes.func.isRequired,
  setEndCoordinate: PropTypes.func.isRequired,
  defineStartOrEndPosition: PropTypes.string.isRequired,
  setTrekPolyline: PropTypes.func.isRequired,
  trekPolyline: PropTypes.array.isRequired,
};
export default Map;
