/* eslint-disable no-loss-of-precision */
import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Button, Col } from 'antd';
// import image from '../container_icon.png';
import { getSensors, getSensorById } from '../utils/api';

const { google } = window;

function ViewMap() {
	// eslint-disable-next-line no-unused-vars
	const [activeSensors, setActiveSensors] = useState();
	const [activeSensorsDetails, setActiveSensorsDetails] = useState();
	const [markersData, setMarkersData] = useState([{
		name: 'BLE 009',
		lat: 24.768817521224076,
		lng: 67.3323277526473,
	}]);
	const markerDataArray = [];
	const mapStyles = {
		height: '70vh',
		width: '100%',
	};

	const defaultCenter = {
		lat: 24.768817521224076,
		lng: 67.3323277526473,
	};
	const getActiveSensors = () => {
		getSensors().then((res) => {
			if (!res) return;
			const activeSensorsList = res?.filter((value) => value.asset !== null);
			if (activeSensorsList) {
				setActiveSensorsDetails(activeSensorsList);
				console.log(activeSensorsDetails);
				const sensorsIdList = activeSensorsList.map((a) => [a.uid, a.name]);

				setActiveSensors(sensorsIdList);
			}
		});
	};

	useEffect(() => {
		getActiveSensors();

		Promise.all(activeSensorsDetails?.map(async (sensor) => {
			const { name } = sensor;
			getSensorById(sensor.uid, '2022-03-15T09:38:48.429Z').then((response) => {
                		const lat = response[response.length - 1].latitude;
                		const lng = response[response.length - 1].longitude;
                		const sensorDetails = { name, lat, lng };
				markerDataArray.push(sensorDetails);
				return ({ name, lat, lng });
			});
		})).then(() => {
			setMarkersData(markerDataArray);
			console.log(markersData);
		});
	}, []);

	const onRefresh = () => {
		getActiveSensors();
		Promise.all(activeSensorsDetails?.map(async (sensor) => {
			const { name } = sensor;
			console.log(name);
			getSensorById(sensor.uid, '2022-03-08T01:36:07.319Z').then((response) => {
                		console.log(response);
                		const lat = response[response.length - 1].latitude;
                		const lng = response[response.length - 1].longitude;
				const sensorDetails = { name, lat, lng };
				markerDataArray.push(sensorDetails);
				return ({ name, lat, lng });
			});
		})).then(() => {
			setMarkersData(markerDataArray);
			console.log(markersData);
		});
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
            // eslint-disable-next-line arrow-body-style
            markersData?.map((item) => {
            	console.log(item);
            	return (
            	google && (
            <Marker
              title={item.name}
              key={item.name}
              position={{
                	lat: item.lat,
                	lng: item.lng,
              }}
            //   icon={{
            //     	url: image,
            //     	anchor: new google.maps.Point(17, 46),

            //     	scaledSize: new google.maps.Size(37, 37),
            //   }}
            />
            	)
            	);
            })
         }
    </GoogleMap>
  </div>
	);
}

export default ViewMap;
