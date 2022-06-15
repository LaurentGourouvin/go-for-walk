import { useEffect } from 'react';
import './TrekDetails.scss';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

function TrekDetails() {
  useEffect(() => {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          }),
        }),
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [46.860191, 2.548828],
        zoom: 5,
      }),
    });

    console.log(map);
  }, []);
  return (
    <div className="TrekDetails">
      <div className="main">
        <p>MAP OPEN LAYER</p>
        <div id="map" className="TrekDetails-map" />
      </div>
    </div>

  );
}

export default TrekDetails;
