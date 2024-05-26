import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RidesMap = ({ rides }) => {
 console.log('Rides received by RidesMap:', rides);
  if (!rides || rides.length === 0) {
    return <p>No rides available to display.</p>;
  }

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
      {rides.map((ride) => (
        <Marker
          key={ride._id}
          position={[ride.originLatitude, ride.originLongitude]}
        >
          <Popup>
            {ride.origin} to {ride.destination}
            <br />
            {ride.date} at {ride.time}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default RidesMap;
