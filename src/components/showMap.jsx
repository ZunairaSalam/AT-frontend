import React, { useEffect, useState } from 'react';
import { Button, Col } from 'antd';
// import moment from 'moment';
import MapContainer from './mapContainer';
import { getSensors, getSensorById } from '../utils/api';

function ShowMap() {
	const [data, setData] = useState();
	useEffect(() => {
		getSensors().then((res) => {
			if (!res) return;
			const activeSensors = res?.filter((value) => value.asset !== null);
			if (activeSensors) {
				console.log(activeSensors);
				const sensorsIdList = activeSensors.map((a) => a.uid);
				setData(sensorsIdList);
			}
		});
	}, []);

	const onRefresh = () => {
		console.log('refresh', data);
		// const now = moment();
		// const nowMinusFive = now.subtract(5, 'minutes').format('YYYY-MM-DD[T]HH:mm:ss[Z]');
		const newObj = {};
		data.forEach((id) => {
			getSensorById(id, '2022-02-24T15:50:31Z').then((res) => {
				if (!res && res === undefined) return;
				newObj[id] = res;
			});
		});
		console.log(newObj);
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
