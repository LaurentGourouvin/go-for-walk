import 'leaflet/dist/leaflet.css';
import {
  MapContainer, TileLayer, Polyline, Marker,
} from 'react-leaflet';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// import L from 'leaflet';
// import endIconMap from './images/end.png';
// import startIconMap from './images/start.png';

function MapTrek({ mapCoordinate }) {
  const [startMarker, setStartMarker] = useState([]);
  // Création d'ICON CUSTOM
  //   const endIcon = L.icon({
  //     iconUrl: endIconMap,
  //     iconSize: [40, 40],
  //   });
  //   const startIcon = L.icon({
  //     iconUrl: startIconMap,
  //     iconSize: [40, 40],
  //   });
  console.log('marker départ:', mapCoordinate[0]);
  useEffect(() => {
    setStartMarker(mapCoordinate[0]);
  }, []);
  return (
    <MapContainer center={[47.159840, 3.164063]} zoom={6} scrollWheelZoom id="map">

      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mapCoordinate.length > 0 ? <Polyline positions={mapCoordinate} /> : '' }
      <Marker position={[49, 1]} />
      {/* {mapCoordinate.length > 0 ? <Marker position={mapCoordinate[0]} icon={startIcon} /> : '' }
      {mapCoordinate.length > 0 ? <Marker position={mapCoordinate[1]} icon={endIcon} /> : '' } */}

    </MapContainer>
  );
}

MapTrek.propTypes = {
  mapCoordinate: PropTypes.array.isRequired,
};
export default MapTrek;
