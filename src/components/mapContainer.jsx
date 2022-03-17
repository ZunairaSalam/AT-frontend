/* eslint-disable react/prop-types */
import React from 'react';
// import { GoogleMap, Marker } from '@react-google-maps/api';
import { useEffect } from 'react/cjs/react.production.min';
// import { locations } from '../utils/constants';
// import image from '../container_icon.png';

const { google } = window;
// const locationPin = 'https://cdn-icons-png.flaticon.com/512/1255/1255714.png';
function initMap() {
	const map = new google.maps.Map(document.getElementById('map'), {
		zoom: 11,
		center: { lat: 33.678, lng: -116.243 },
		mapTypeId: 'terrain',
	});
	// eslint-disable-next-line no-unused-vars
	const rectangle = new google.maps.Rectangle({
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#FF0000',
		fillOpacity: 0.35,
		map,
		bounds: {
			north: 33.685,
			south: 33.671,
			east: -116.234,
			west: -116.251,
		},
	});
}
function MapContainer() {
	useEffect(() => {
		initMap();
	});
	// const mapStyles = {
	// 	height: '70vh',
	// 	width: '100%',
	// };

	// const defaultCenter = {
	// 	lat: 25.109895082618095, lng: 62.342519825122366,
	// };
	// console.log( markerData);
	return (
	// <GoogleMap
	//   mapContainerStyle={mapStyles}
	//   zoom={18}
	//   center={defaultCenter}
	// >
	//   {
	//     locations?.map((item) => (
	//     	google && (
	//       <Marker
	//         title={item.name}
	//         key={item.name}
	//         position={item.location}
	//         icon={{
	//         	url: image,
	//         	anchor: new google.maps.Point(17, 46),

  //         	scaledSize: new google.maps.Size(37, 37),
  //         }}
  //       />
  //     	)
  //     ))
  //  }
  // </GoogleMap>
  <div id="map" />

	);
}

export default MapContainer;
