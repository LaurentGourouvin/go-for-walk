import 'leaflet/dist/leaflet.css';
import {
  MapContainer, TileLayer, Polyline, Marker,
} from 'react-leaflet';
import PropTypes from 'prop-types';
import L from 'leaflet';
import endIconMap from './images/end.png';
import startIconMap from './images/start.png';

function MapTrek({ mapCoordinate, startMarker, endMarker }) {
  // Création d'ICON CUSTOM
  const endIcon = L.icon({
    iconUrl: endIconMap,
    iconSize: [40, 40],
  });
  const startIcon = L.icon({
    iconUrl: startIconMap,
    iconSize: [40, 40],
  });

  return (
    <MapContainer key={Math.random()} center={[47.159840, 3.164063]} zoom={6} scrollWheelZoom id="map">

      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mapCoordinate.length > 0 ? <Polyline positions={mapCoordinate} /> : '' }
      <Marker position={startMarker} icon={startIcon} />
      <Marker position={endMarker} icon={endIcon} />

    </MapContainer>
  );
}

MapTrek.propTypes = {
  mapCoordinate: PropTypes.array.isRequired,
  startMarker: PropTypes.object.isRequired,
  endMarker: PropTypes.object.isRequired,
};
export default MapTrek;
