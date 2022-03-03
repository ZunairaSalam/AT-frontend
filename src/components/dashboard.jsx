import React, { useState, useEffect } from 'react';
import {
	Statistic, Card, Row, Col, Typography,
} from 'antd';
import { CheckOutlined, StopOutlined } from '@ant-design/icons';
import {
	useNavigate,
} from 'react-router-dom';
import { getSensors } from '../utils/api';

const { Title } = Typography;
// import useInterval from '../utils/utils';
// import axiosHeader from '../utils/axiosHeader';

// eslint-disable-next-line react/prop-types
function Dashboard() {
	const navigate = useNavigate();
	const [activeCount, setActiveCount] = useState(0);
	const [inactiveCount, setInactiveCount] = useState(0);
	// eslint-disable-next-line no-unused-vars
	const [data, setData] = useState();
	useEffect(() => {
		getSensors().then((res) => {
			if (!res) return;
			setData(res);
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
    <Title level={3}>Dashboard</Title>
    <Row>
      <Col span={6} offset={6} className="activeClass">
        {' '}
        <Card
          bodyStyle={{ backgroundColor: 'rgba(60, 179, 113, 0.4)', border: 0 }}
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
      <Col span={6} className="activeClass">
        {' '}
        <Card
          bodyStyle={{ backgroundColor: 'rgba(255, 0, 0, 0.4)', border: 0 }}
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
  </div>
	);
}

export default Dashboard;
