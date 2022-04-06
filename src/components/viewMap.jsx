/* eslint-disable no-unused-vars */
/* eslint-disable no-loss-of-precision */
import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import {
	Button, Row, Col, Spin,
} from 'antd';
// import image from '../container_icon.png';
import { getSensors, getSensorById, getSensorsByLastActive } from '../utils/api';

const { google } = window;
// eslint-disable-next-line no-promise-executor-return
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
function ViewMap() {
	// eslint-disable-next-line no-unused-vars
	const [activeSensors, setActiveSensors] = useState();
	const [activeSensorsDetails, setActiveSensorsDetails] = useState();
	const [markersData, setMarkersData] = useState();
	const markerDataArray = [];
	const mapStyles = {
		height: '60vh',
		width: '99%',
	};
	const [loading, setLoading] = useState(false);
	const defaultCenter = {
		lat: 24.77179336354178,
		lng: 67.33396305569475,
	};

	const SetDataForMarker = () => {
		getSensorsByLastActive().then((responseObj) => {
			if (!responseObj) return;
			console.log(responseObj);
			const responseDataValues = responseObj.data?.map((element) => (
				{ name: element.sensor.name, lat: element.latitude, lng: element.longitude }
			));
			setMarkersData([...responseDataValues]);
			console.log(markersData);
			setLoading(false);
		});
	};

	useEffect(() => {
		SetDataForMarker();
	}, []);

	// useEffect(() => {
	// 	getSensors().then((res) => {
	// 	  if (!res) return;
	// 	  const activeSensorsList = res?.filter((value) => value.asset !== null);
	// 	  setActiveSensorsDetails(activeSensorsList);
	// 		const getData = [];

	// 	  //   let markerDataArray = [];
	// 		activeSensorsList.map(async (sensor) => {
	// 			getData.push(getSensorById(sensor.uid, '2022-03-24T19:15:26.255Z'));
	// 		});
	// 		Promise.all(getData).then((values) => {
	// 			console.log('**************');
	// 			console.log(values);
	// 			const responseDataValues = 	values.map((response) => {
	// 				const lat = response[response.length - 1].latitude;
	// 				const lng = response[response.length - 1].longitude;
	// 				const { timestamp } = response[response.length - 1];
	// 				return {
	// 					name: 'test', lat, lng, timestamp,
	// 				};
	// 			});
	// 			setMarkersData([...responseDataValues]);
	// 		});
	// 	  console.log('markerData sensor outer', markerDataArray);
	// 	});
	//   }, []);

	const onRefresh = () => {
		setLoading(true);
		SetDataForMarker();
	};
	return (
  <div>

    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={17.2}
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
                	lat: parseFloat(item.lat),
                	lng: parseFloat(item.lng),
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
    <br />
    <Row justify="end">
      {/* <Col offset={6}> */}
      <Button
        type="primary"
        onClick={() => onRefresh()}
        disabled={loading}
      >
        {loading ? <Spin tip="Loading..." /> : 'Refresh Map' }

      </Button>
      {/* </Col> */}
    </Row>

    <br />
  </div>
	);
}

export default ViewMap;
