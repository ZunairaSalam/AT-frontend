import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { getSensors } from '../utils/api';
// import useInterval from '../utils/utils';

function Dashboard() {
	const [activeCount, setActiveCount] = useState(0);
	// eslint-disable-next-line no-unused-vars
	const [inactiveCount, setInactiveCount] = useState(0);
	const [data, setData] = useState();

	useEffect(() => {
		getSensors().then((res) => {
			if (!res) return;
			console.log(typeof (res));
			setData(res);
			console.log(data);
			setActiveCount(Object.keys(res).length);
			data?.forEach((element) => {
				if (element.asset != null) {
					setActiveCount(activeCount + 1);
				} else { setInactiveCount(inactiveCount + 1); }
				console.log(element.asset);
			});
		});
	}, []);
	// useInterval(() => {
	// 	getSensors().then((res) => {
	// 		if (!res) return;
	// 		setData(res);
	// 		console.log(data);
	// 		setActiveCount(Object.keys(res).length);
	// 		data.forEach((element) => {
	// 			if (element.asset != null) {
	// 				setActiveCount(activeCount + 1);
	// 			} else { setInactiveCount(inactiveCount + 1); }
	// 			console.log(element.asset);
	// 		});
	// 	});
	//   }, 1000 * 10);

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
