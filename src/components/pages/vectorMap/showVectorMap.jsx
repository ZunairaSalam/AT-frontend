/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import VectorMap, {
	Layer,
	Tooltip,
	Label,
	Annotation,
} from 'devextreme-react/vector-map';

import {
	Statistic, Card, Row, Col, Typography, Button,
} from 'antd';
import { CheckOutlined, StopOutlined } from '@ant-design/icons';
import {
	useNavigate,
} from 'react-router-dom';
import { roomsData, buildingData } from './data';
import { getSensorsByLastActive } from '../../../utils/api';

const projection = {
	to: ([l, lt]) => [l / 100, lt / 100],
	from: ([x, y]) => [x * 100, y * 100],
};
// eslint-disable-next-line no-promise-executor-return
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const sizeGroups = [0, 8000, 10000, 50000];
const { Title } = Typography;
const slopex = 21686.7469;
const slopey = 12213.7404;
function customizeTooltip(arg) {
	if (arg.layer.name === 'rooms') {
		return { text: `Square: ${arg.attribute('square')} ft&#178` };
	}
	return null;
}
function customizeTooltipMarker(arg) {
	if (arg.layer.type === 'marker') {
		return { text: arg.attribute('tooltip') };
	}
	return null;
}
// const createMarkerObject = (sensor) => {
// 	// eslint-disable-next-line no-debugger
// 	debugger;
// 	const { name } = sensor;
// 	const markerDataArray = [];
// 	getSensorById(sensor.uid, '2022-03-08T01:36:07.319Z').then((response) => {
// 		if (!response && response === undefined) return;
// 		console.log(response);
// 		const x = response[response.length - 1].anglePitch;
// 		const y = response[response.length - 1].angleRoll;
// 		sensorDetails = { name, x, y };
// 		markerDataArray.push(sensorDetails);
// 		// return ({ name, x, y });
// 	});
// 	console.log(markerDataArray);
// };
// eslint-disable-next-line react/prop-types
function ShowVectorMap() {
	const [markerData, setMarkerData] = useState([{
		name: 'BLE 009',
		x: -74,
		y: 40.7,
	},
	{
		name: 'BLE 001',
		x: -74,
		y: 40.7,
	}]);
	// eslint-disable-next-line no-unused-vars
	const [markersData, setMarkersData] = useState();
	const [featureMarkers, setFeatureMarkers] = useState();

	const SetDataForMarker = async () => {
		getSensorsByLastActive().then((responseObj) => {
			if (!responseObj) return;
			console.log(responseObj);
			const responseDataValues = responseObj?.map((element) => (
				{
					coordinates:
          [-74, 40.7],
					text: element.sensor.name,
					value: 8922,
				}
			));
			setMarkersData([...responseDataValues]);

			(async () => { await delay(5000); })();
			console.log(markersData);

			const markers = {
				type: 'FeatureCollection',
				features: [...markersData].map((detail) => ({
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: detail.coordinates,
					},
					properties: {
						text: detail.text,
						value: detail.value,
						tooltip: `<b>${detail.text}</b>\n${detail.value}`,
					},
				})),
			};
			setFeatureMarkers(markers);
			console.log(markers);
			// setLoading(false);
		});
	};
	useEffect(() => {
		SetDataForMarker();
	}, []);

	const handleRefresh = () => {
	};
	return (
  <div className="contentTransparentBox">
    <Title level={3}>Vector Map</Title>

    <VectorMap
      id="vector-map"
      maxZoomFactor={4}
      projection={projection}
    >
      <Layer
        dataSource={buildingData}
        hoverEnabled={false}
        name="building"
      />
      <Layer
        dataSource={roomsData}
        name="rooms"
        borderWidth={1}
        color="transparent"
      >
        <Annotation
          type="text"
          text="Annotation text"
        />
        <Label enabled dataField="name" />
      </Layer>
      <Layer
        type="marker"
        dataSource={featureMarkers}
        // name="bubbles"
        elementType="bubble"
        dataField="value"
        // minSize={20}
        // maxSize={40}
        // sizeGroups={sizeGroups}
        // opacity="0.8"
      >
        <Label enabled={false} />
      </Layer>
      <Tooltip
        enabled
        customizeTooltip={customizeTooltip}
      />
      <Tooltip
        enabled
        customizeTooltip={customizeTooltipMarker}
      />
    </VectorMap>
  </div>
	);
}

export default ShowVectorMap;
