/* eslint-disable no-debugger */
/* eslint-disable no-loss-of-precision */
/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Button, Col } from 'antd';
// import moment from 'moment';
import image from '../container_icon.png';
// import MapContainer from './mapContainer';
import { getSensors, getSensorById } from '../utils/api';

const { google } = window;

function ShowMap() {
	const [data, setData] = useState();
	const [sensorsDetails, setSensorsDetails] = useState();
	const [activeSensors, setActiveSensors] = useState();
	const [markerData, setMarkerData] = useState([{
		name: 'BLE 009',
		lat: -74,
		lng: 40.7,
	}]);
	const mapStyles = {
		height: '70vh',
		width: '100%',
	};

	const defaultCenter = {
		lat: 33.6844,
		lng: 73.0479,
	};
	useEffect(() => {
		getSensors().then((res) => {
			if (!res) return;
			const activeSensorsList = res?.filter((value) => value.asset !== null);
			if (activeSensorsList) {
				console.log(activeSensorsList);
				const sensorsIdList = activeSensorsList.map((a) => [a.uid, a.name]);
				setActiveSensors(activeSensorsList);
				setData(sensorsIdList);
			}
		});
	}, []);

	const markerDataArray = [];
	useEffect(() => {
		let sensorDetails;
		// for (let i = 0; i < activeSensors?.length; i += 1) {
		// 	// createMarkerObject(activeSensors[i]);
		// 	const { name } = activeSensors[i];
		// 	getSensorById(activeSensors[i].uid, '2022-03-08T01:36:07.319Z').then((response) => {
		// 		console.log(response);
		// 		const lat = response[response.length - 1].anglePitch + 25.109895082618078;
		// 		const lng = response[response.length - 1].angleRoll + 62.342519824864265;
		// 		sensorDetails = { name, lat, lng };
		// 		markerDataArray.push(sensorDetails);
		// 		// return ({ name, x, y });
		// 		console.log(markerDataArray);
		// 	});
		// }
		setMarkerData(markerDataArray);
	}, [activeSensors]);

	const onRefresh = () => {
		let sensorDetails;
		for (let i = 0; i < activeSensors?.length; i += 1) {
			// createMarkerObject(activeSensors[i]);
			const { name } = activeSensors[i];
			debugger;
			getSensorById(activeSensors[i].uid, '2022-03-08T01:36:07.319Z').then((response) => {
				console.log(response);
				const lat = response[response.length - 1].anglePitch + 25.1098950826180;
				const lng = response[response.length - 1].angleRoll + 62.342519824864;
				sensorDetails = { name, lat, lng };
				markerDataArray.push(sensorDetails);
				// return ({ name, x, y });
			});
		}
		console.log(markerDataArray);
		setMarkerData(markerDataArray);
	};
	return (
  <div>
    <Col span={2} offset={10}>
      <Button type="primary" onClick={() => onRefresh()}>Refresh</Button>
    </Col>
    <br />
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={18}
      center={defaultCenter}
    >
      {
      markerData?.map((item) => (
      	google && (
        <Marker
          title={item.name}
          key={item.name}
          position={{
          	lat: 33.6844,
          	lng: 73.0479,
          }}
          icon={{
          	url: image,
          	anchor: new google.maps.Point(17, 46),

          	scaledSize: new google.maps.Size(37, 37),
          }}
        />
      	)
      ))
   }
    </GoogleMap>
  </div>
	);
}

export default ShowMap;
