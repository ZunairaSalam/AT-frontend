import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { locations } from '../utils/constants';

const { google } = window;
const locationPin = 'https://cdn-icons-png.flaticon.com/512/1255/1255714.png';
function MapContainer() {
	const mapStyles = {
		height: '100vh',
		width: '100%',
	};

	const defaultCenter = {
		lat: 25.109895082618095, lng: 62.342519825122366,
	};

	return (

  <GoogleMap
    mapContainerStyle={mapStyles}
    zoom={15}
    center={defaultCenter}
  >
    {
      locations.map((item) => (
      	google && (
        <Marker
          title={item.name}
          key={item.name}
          position={item.location}
          icon={{
          	url: locationPin,
          	anchor: new google.maps.Point(17, 46),

          	scaledSize: new google.maps.Size(37, 37),
          }}
        />
      	)
      ))
   }
  </GoogleMap>

	);
}

export default MapContainer;
