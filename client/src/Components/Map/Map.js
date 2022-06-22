import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import PropTypes from 'prop-types';

function Map({ setStartCoordinate }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Je créer une fonction qui va être utiliser en tant que Composant pour Leaflet
  // Ce composant vas utiliser le hook useMapEvents afin de pouvoir accéder aux différentes
  // handler de Leaflet pour les interaction avec la MAP
  function GetStartPostionLatLgt() {
    // Je créer une variable me permettant d'utiliser le useMapEvents()
    // eslint-disable-next-line no-unused-vars
    const map = useMapEvents({
      // Une fois l'appel du HOOKS, je surchage sa config avec {}.
      // Je surchage la méthode "Click" afin de pouvoir obtenir la position lors du Click et je modifie mon state
      // avec les nouvelles valeurs
      click: (e) => {
        const { lat, lng } = e.latlng; // https://leafletjs.com/reference.html#handler
        setLatitude(lat);
        setLongitude(lng);
      },
    });
  }
  function GetEndPostionLatLgt() {
    // Je créer une variable me permettant d'utiliser le useMapEvents()
    // eslint-disable-next-line no-unused-vars
    const map = useMapEvents({
      // Une fois l'appel du HOOKS, je surchage sa config avec {}.
      // Je surchage la méthode "Click" afin de pouvoir obtenir la position lors du Click et je modifie mon state
      // avec les nouvelles valeurs
      click: (e) => {
        const { lat, lng } = e.latlng; // https://leafletjs.com/reference.html#handler
        setLatitude(lat);
        setLongitude(lng);
        setStartCoordinate({ lat, lng });
      },
    });
  }
  return (
    <>
      <p>Lat: {latitude} </p>
      <p>Long: {longitude}</p>

      <MapContainer center={[47.159840, 3.164063]} zoom={6} scrollWheelZoom id="map">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GetStartPostionLatLgt />
        <GetEndPostionLatLgt />
      </MapContainer>
    </>
  );
}

Map.propTypes = {
  setStartCoordinate: PropTypes.func.isRequired,
};
export default Map;
