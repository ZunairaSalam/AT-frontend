/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import {
	Menu, Dropdown, Layout, Row, Col, DatePicker, Button, Typography,
} from 'antd';
import moment from 'moment';
import { DownOutlined } from '@ant-design/icons';
import {
	getSensors, getSensorById,
} from '../../../utils/api';
import SensorDropdown from './sensorDropdown';
import SingleSensor from '../../singleSensor';

// import TimeDropdown from './timeDropdown';

const { Header, Content } = Layout;
function ViewSensor() {
	const [allSensorsList, setAllSensorsList] = useState();
	const [selectedSensorIdData, setSelectedSensorIdData] = useState();
	const [selectedSensorId, setSelectedSensorId] = useState();
	const [selectedSensorName, setSelectedSensorName] = useState();
	const [selectedTime, setSelectedTime] = useState(moment().format('YYYY-MM-DD[T]HH:mm:ss[Z]'));
	const [isTimeSelected, setIsTimeSelected] = useState(false);

	// const [showTimeOption, setShowTimeOption] = useState();
	const { Title } = Typography;
	// get all available sensors info
	useEffect(() => {
		getSensors().then((res) => {
			if (!res && res === undefined) return;
			setAllSensorsList(res);
			console.log(res);
		});
	}, []);

	// get details of selected sensor and time
	const getDetailsBySensorIdTime = (id, time) => {
		console.log(time);
		getSensorById(id, time).then((res) => {
			if (!res && res === undefined) return;
			setSelectedSensorIdData(res);
		});
		console.log('id in parent:', id);
	};

	// eslint-disable-next-line no-unused-vars
	const handleTimeSelect = (value) => {
		// use .format() of moment.js to get desired format
		console.log('Selected Time: ', value.format('YYYY-MM-DD[T]HH:mm:ss[Z]'));
		setSelectedTime(value.format('YYYY-MM-DD[T]HH:mm:ss[Z]'));
		setIsTimeSelected(true);
	};

	const handleSensorSelect = (id, name) => {
		setSelectedSensorId(id);
		setSelectedSensorName(name);
		// getDetailsBySensorIdTime(id, selectedTime);
		console.log('handleSensorSelect: ', id);
	};
	const menu = (
  <Menu>
    {allSensorsList?.map((elm) => (
      <SensorDropdown
        key={elm.uid}
        uid={elm.uid}
        sname={elm.name}
        asset={elm.asset}
        func={handleSensorSelect}
      />
    	))}
  </Menu>
	);

	// const myTimeOptions = (
	// <TimeDropdown func={handleTimeSelect} showFunc={setShowTimeOption} />
	// );

	return (
  <div>
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <Title level={3}>Select Sensor to View Data</Title>
    </Header>
    {/* <Table columns={columns} dataSource={allSensorsList} /> */}
    <Content style={{ margin: '10px 16px' }}>
      <Row>
        <span>Sensor:</span>
        <Col span={2}>
          <Dropdown
            overlay={menu}
            trigger={['click']}
          >
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              {selectedSensorName || 'Select Sensor'}
              <DownOutlined />
            </a>
          </Dropdown>
        </Col>
        <Col span={4}>
          {' '}
          <span>Date and Time:</span>
        </Col>
        <Col span={4}>
          <DatePicker
            showTime
            onChange={(value) => handleTimeSelect(value)}
            // onOk={getDetailsBySensorIdTime(selectedSensorId, selectedTime)}
            onOk={(value) => {
            	// setShowTimeOption('Select Time');
            	handleTimeSelect(value);
            }}
          />
        </Col>
        {/* <Col span={2}>

          <Dropdown overlay={myTimeOptions} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              {showTimeOption || 'Select Time'}
              <DownOutlined />
            </a>
          </Dropdown>

        </Col> */}
        <Col span={2} />
        <Col span={2}>
          <Button type="primary" disabled={!selectedSensorId && isTimeSelected} onClick={() => getDetailsBySensorIdTime(selectedSensorId, selectedTime)}>Get Sensor Data</Button>
        </Col>
      </Row>
    </Content>
    {/* {showSensorInfo && <SingleSensor allSensorsList={allSensorsList} />} */}
    {selectedSensorIdData && <SingleSensor data={selectedSensorIdData} />}
  </div>
	);
}

export default ViewSensor;
