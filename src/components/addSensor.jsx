import React, { useEffect, useState } from 'react';
// import axios from 'axios';

import {
	Table,
} from 'antd';
import useInterval from '../utils/utils';
import { columns } from '../utils/constants';
import { getSensors } from '../utils/api';

function AddSensors() {
	const [data, setData] = useState('');

	useEffect(() => {
		getSensors().then((res) => {
			if (!res) return;
			setData(res);
		});
	}, []);
	useInterval(() => {
		getSensors().then((res) => {
			if (!res) return;
			setData(res);
		});
	  }, 1000 * 10);
	// useEffect(() => {
	// 	axios('https://at-backend1.herokuapp.com/sensor/all')
	// 		.then((response) => {
	// 			setData(response.data);
	// 			console.log(response);
	// 		})
	// 		.catch((error) => {
	// 			console.error('Error Fetching data', error);
	// 		});
	// }, []);
	// useInterval(() => {
	// 	axios('https://at-backend1.herokuapp.com/sensor/all')
	// 		.then((response) => {
	// 			setData(response.data);
	// 			console.log(response);
	// 		})
	// 		.catch((error) => {
	// 			console.error('Error Fetching data', error);
	// 		});
	//   }, 1000 * 10);
	return (
  <div>
    <h1>Show Sensor Data</h1>
    {/* <Button type="primary" onClick={showSensordata}>Show Sensor Data</Button> */}
    <Table columns={columns} dataSource={data} />
  </div>
	);
}

export default AddSensors;
