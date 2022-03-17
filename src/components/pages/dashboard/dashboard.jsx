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
import { getSensors, getSensorById } from '../../../utils/api';

const projection = {
	to: ([l, lt]) => [l / 100, lt / 100],
	from: ([x, y]) => [x * 100, y * 100],
};

const sizeGroups = [0, 8000, 10000, 50000];
const { Title } = Typography;

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
function Dashboard() {
	const navigate = useNavigate();
	const [activeCount, setActiveCount] = useState(0);
	const [activeSensors, setActiveSensors] = useState();
	const [inactiveCount, setInactiveCount] = useState();
	const [markerData, setMarkerData] = useState([{
		name: 'BLE 009',
		x: -74,
		y: 40.7,
	}]);
	// eslint-disable-next-line no-unused-vars
	const [data, setData] = useState();

	useEffect(() => {
		let mounted = true;
		getSensors().then((res) => {
			if (!res) return;
			if (mounted) {
				setData(res);
				const activeSensorsRes = res?.filter((value) => value.asset !== null);
				setActiveSensors(activeSensorsRes);
				// eslint-disable-next-line no-unsafe-optional-chaining
				const inactiveSensorsLength = res?.length - activeSensorsRes?.length;
				setActiveCount(activeSensorsRes?.length);
				setInactiveCount(inactiveSensorsLength);
			}
		});

		// for (let i = 0; i <= activeSensors?.length; i += 1) {
		// 	createMarkerObject(activeSensors[i]);
		// }
		// eslint-disable-next-line no-return-assign
		return () => mounted = false;
	}, []);
	const markerDataArray = [];
	useEffect(() => {
		let sensorDetails;
		for (let i = 0; i < activeSensors?.length; i += 1) {
			// createMarkerObject(activeSensors[i]);
			const { name } = activeSensors[i];
			getSensorById(activeSensors[i].uid, '2022-03-08T01:36:07.319Z').then((response) => {
				if (!response && response === undefined) return;
				console.log(response);
				const x = response[response.length - 1].anglePitch;
				const y = response[response.length - 1].angleRoll;
				sensorDetails = { name, x, y };
				markerDataArray.push(sensorDetails);
				// return ({ name, x, y });
				console.log(markerDataArray);
			});
		}
		setMarkerData(markerDataArray);
	}, []);

	// const markersArray = activeSensors?.map((elm) => {
	// 	let x;
	// 	let y;
	// 	const { name } = elm;
	// 	getSensorById(elm.uid, '2022-03-03T13:36:07.319Z').then((res) => {
	// 		if (!res && res === undefined) return;
	// 		console.log(res[res.length - 1].anglePitch);
	// 		x = res[res.length - 1].anglePitch;
	// 		y = res[res.length - 1].angleRoll;
	// 	});
	// 	return ([{
	// 		coordinates: [-74, 40.7],
	// 		attributes: {
	// 			text: name,
	// 			value: 7,
	// 		},
	// 	}]);
	// });
	// [{
	// 	coordinates: [-74, 40.7],
	// 	attributes: {
	// 		text: 'Sacramento',
	// 		value: 7,
	// 	},
	// }, {
	// 	coordinates: [30.43, 33.33],
	// 	attributes: {
	// 		text: 'Austin',
	// 		value: 7,
	// 	},
	// }];

	 const markers = {
		type: 'FeatureCollection',
		features: [
			// markerData?.map((singleMarker) => ({
			// 	coordinates: [singleMarker.x, singleMarker.y],
			// 	text: singleMarker.name,
			// 	value: 8922,
			// })),
			{
				coordinates: [-74, 40.7],
				text: 'BLE Tag 1',
				value: 8922,
			},
		].map((detail) => ({
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
	const handleRefresh = () => {
		let sensorDetails;
		for (let i = 0; i < activeSensors?.length; i += 1) {
			// createMarkerObject(activeSensors[i]);

			const { name } = activeSensors[i];
			getSensorById(activeSensors[i].uid, '2022-03-08T01:36:07.319Z').then((response) => {
				if (!response && response === undefined) return;
				console.log(response);
				const x = response[response.length - 1].anglePitch;
				const y = response[response.length - 1].angleRoll;
				sensorDetails = { name, x, y };
				markerDataArray.push(sensorDetails);
				console.log(markerDataArray);
				// return ({ name, x, y });
			});
		}
		setMarkerData(markerDataArray);
	};
	return (
  <div className="contentTransparentBox">
    <Title level={3}>Dashboard</Title>
    <Row>
      <Col span={5} className="activeClass">
        {' '}
        <Card
          bodyStyle={{ backgroundColor: 'rgba(0, 214, 7, 0.6)', border: 4 }}
          onClick={() => navigate('/activeSensors')}
        >
          <Statistic
            title="Active Sensors"
            value={activeCount}
            valueStyle={{ color: '#3f8600' }}
            prefix={<CheckOutlined />}
            // suffix="%"
          />
        </Card>

      </Col>
      <Col span={5} className="activeClass">
        {' '}
        <Card
          bodyStyle={{ backgroundColor: 'rgba(255, 0, 0, 0.5)', border: 0 }}
          onClick={() => navigate('/inactiveSensors')}
        >
          <Statistic
            title="InActive Sensors"
            value={inactiveCount}
            valueStyle={{ color: '#cf1322' }}
            prefix={<StopOutlined />}
          />
        </Card>

      </Col>
    </Row>
    <Button type="primary" onClick={() => handleRefresh()}>Refresh</Button>
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
        dataSource={markers}
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

export default Dashboard;
