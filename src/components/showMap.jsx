/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Col } from 'antd';
// import moment from 'moment';
import MapContainer from './mapContainer';
import { getSensors, getSensorById } from '../utils/api';

function ShowMap() {
	const [data, setData] = useState();
	const [sensorsDetails, setSensorsDetails] = useState();
	useEffect(() => {
		getSensors().then((res) => {
			if (!res) return;
			const activeSensors = res?.filter((value) => value.asset !== null);
			if (activeSensors) {
				console.log(activeSensors);
				const sensorsIdList = activeSensors.map((a) => [a.uid, a.name]);
				setData(sensorsIdList);
			}
		});
	}, []);

	const onRefresh = () => {
		console.log('refresh', data);
		// const now = moment();
		// const nowMinusFive = now.subtract(5, 'minutes').format('YYYY-MM-DD[T]HH:mm:ss[Z]');
		// const newObj = {};
		data.forEach((sensor) => {
			getSensorById(sensor[0], '2022-02-24T15:50:31Z').then((res) => {
				if (!res && res === undefined) return;
				console.log(res[res.length - 1].anglePitch);
				const x = res[res.length - 1].anglePitch;
				const y = res[res.length - 1].angleRoll;

				// newObj[id] = res.length - 1;
			});
		});
		// console.log(newObj[36]);
	};
	return (
  <div>
    <Col span={2} offset={10}>
      <Button type="primary" onClick={() => onRefresh()}>Refresh</Button>
    </Col>
    <br />
    <MapContainer />
  </div>
	);
}

export default ShowMap;
