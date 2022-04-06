/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
	Statistic, Card, Row, Col, Typography, Button,
} from 'antd';
import { AppstoreOutlined, CheckOutlined, StopOutlined } from '@ant-design/icons';
import {
	useNavigate,
} from 'react-router-dom';
import { roomsData, buildingData } from './data';
import { getSensors, getAssets } from '../../../utils/api';
import ViewMap from '../../viewMap';

const { Title } = Typography;

// eslint-disable-next-line react/prop-types
function Dashboard() {
	const navigate = useNavigate();
	const [activeCount, setActiveCount] = useState(0);
	const [activeSensors, setActiveSensors] = useState();
	const [inactiveCount, setInactiveCount] = useState();
	const [assetData, setAssetData] = useState();
	const [assetCount, setAssetCount] = useState();
	// eslint-disable-next-line no-unused-vars
	const [sensorsData, setSensorsData] = useState();

	useEffect(() => {
		let mounted = true;
		const getData = [];
		getData.push(getSensors(), getAssets());
		Promise.all(getData).then((values) => {
			console.log(values);
			setSensorsData(values[0]);
			setAssetData(values[1]);
			setActiveCount(values[0].filter((item) => item.asset !== null).length);
			setInactiveCount(values[0].filter((item) => item.asset === null).length);
			setAssetCount(values[1].length);
		});
		// getSensors().then((res) => {
		// 	if (!res) return;
		// 	console.log(res);
		// 	if (mounted) {
		// 		setData(res);
		// 		const activeSensorsRes = res?.filter((value) => value.asset !== null);
		// 		setActiveSensors(activeSensorsRes);
		// 		// eslint-disable-next-line no-unsafe-optional-chaining
		// 		const inactiveSensorsLength = res?.length - activeSensorsRes?.length;
		// 		setActiveCount(activeSensorsRes?.length);
		// 		setInactiveCount(inactiveSensorsLength);
		// 	}
		// 	getAssets().then((response) => {
		// 		if (!response) return;
		// 		setAssetData(response);
		// 		const count = assetData?.length;
		// 		setAssetCount(count);
		// 		console.log(assetData);
		// 	});
		// });

		// eslint-disable-next-line no-return-assign
		return () => mounted = false;
	}, []);

	return (
  <div className="contentTransparentBox">
    <Title level={3}>Dashboard</Title>
    <Row gutter={16}>
      <Col span={6}>
        <Row>
          <Col span={24} className="activeClass">
            {' '}
            <Card
              bordered={false}
              bodyStyle={{ backgroundColor: 'rgba(0, 214, 7, 0.4)', borderRadius: 5, cursor: 'pointer' }}
              onClick={() => navigate('/activeSensors')}
            >
              <Statistic
                title="Total Attached Sensors"
                value={activeCount}
                valueStyle={{ color: '#3f8600' }}
                prefix={<CheckOutlined />}
              />
            </Card>

          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24} className="activeClass">
            {' '}
            <Card
              bordered={false}
              bodyStyle={{ backgroundColor: 'rgba(255, 0, 0, 0.35)', borderRadius: 5, cursor: 'pointer' }}
              onClick={() => navigate('/attachSensors')}
            >
              <Statistic
                title="Total UnAttached Sensors"
                value={inactiveCount}
                valueStyle={{ color: '#cf1322' }}
                prefix={<StopOutlined />}
              />
            </Card>

          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24} className="activeClass">
            {' '}
            <Card
              bordered={false}
              bodyStyle={{ backgroundColor: 'rgba(255, 185, 0, 0.35)', borderRadius: 5, cursor: 'pointer' }}
              onClick={() => navigate('/trackAssets')}
            >
              <Statistic
                title="Total Assets"
                value={assetCount}
                valueStyle={{ color: 'rgb(255, 139, 0)' }}
                prefix={<AppstoreOutlined />}
              />
            </Card>

          </Col>

        </Row>
      </Col>
      <Col span={18}><ViewMap /></Col>
    </Row>

  </div>
	);
}

export default Dashboard;
