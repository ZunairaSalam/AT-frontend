// import React from 'react';
// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

// const mapStyles = {
// 	width: '100%',
// 	height: '100%',
// };

// export function MapContainer(google) {
// 	return (
//   <Map
//     google={google}
//     zoom={14}
//     style={mapStyles}
//     initialCenter={{
//     	lat: 40.854885,
//     	lng: -88.081807,
//     }}
//   >
//     <Marker position={{ lat: 48.00, lng: -122.00 }} />
//   </Map>
// 	);
// }

// export default GoogleApiWrapper({
// 	apiKey: 'AIzaSyCcKPHB5s2SnGCyHyBZgML1Ka3aqwQIA20',
// })(MapContainer);

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { locations } from '../utils/constants';

function MapContainer() {
	const mapStyles = {
		height: '100vh',
		width: '100%',
	};

	const defaultCenter = {
		lat: 25.109895082618095, lng: 62.342519825122366,
	};

	return (
  <LoadScript
    googleMapsApiKey="AIzaSyCcKPHB5s2SnGCyHyBZgML1Ka3aqwQIA20"
  >
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={15}
      center={defaultCenter}

    >
      {
      locations.map((item) => (
        <Marker key={item.name} position={item.location} />
      ))
   }
    </GoogleMap>
  </LoadScript>
	);
}

export default MapContainer;
