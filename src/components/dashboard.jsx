import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { getSensors } from '../utils/api';
// import useInterval from '../utils/utils';
// import axiosHeader from '../utils/axiosHeader';

// eslint-disable-next-line react/prop-types
function Dashboard() {
	const [activeCount, setActiveCount] = useState(0);
	// eslint-disable-next-line no-unused-vars
	const [inactiveCount, setInactiveCount] = useState(0);
	// eslint-disable-next-line no-unused-vars
	const [data, setData] = useState();
	// const authenticated = sessionStorage.getItem('auth_token');

	useEffect(() => {
		getSensors().then((res) => {
			if (!res) return;
			setData(res);
			// eslint-disable-next-line no-debugger
			debugger;
			const activeSensors = res?.filter((value) => value.asset !== null);
			const inactiveSensorsLength = res.length - activeSensors.length;
			setActiveCount(activeSensors.length);
			setInactiveCount(inactiveSensorsLength);
		});
	}, []);

	// const getSensorsAll = async () => {
	// 	try {
	// 		  const res = await axiosHeader.get('sensor/all');
	// 		  console.log(res.data[res.data.length - 1]);
	// 		  setData(res);
	// 		  console.log(res);
	// 		  // setData(res.data[res.data.length - 1]);
	// 		  data?.forEach((element) => {
	// 			if (element.asset != null) {
	// 				setActiveCount(activeCount + 1);
	// 			} else { setInactiveCount(inactiveCount + 1); }
	// 		});
	// 	} catch (e) {
	// 		  console.log(e);
	// 	}
	// };
	// useEffect(() => {
	// 	getSensorsAll();
	// }, []);
	return (
  <div>
    <h1>Dashboard</h1>
    <Row>
      <Col span={6} className="activeClass">Active Sensors</Col>
      <Col span={6} className="activeClass">InActive Sensors</Col>
      <Col span={6} className="activeClass">Assign Sensor to Asset</Col>
      <Col span={6} className="activeClass">Remove Sensor from Asset</Col>
    </Row>
    <Row>
      <Col span={6}>{activeCount}</Col>
      <Col span={6}>{inactiveCount}</Col>
      <Col span={6}>-</Col>
      <Col span={6}>-</Col>
    </Row>
  </div>
	);
}

export default Dashboard;
