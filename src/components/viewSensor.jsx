/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
// import axios from 'axios';

import {
	Menu, Dropdown, Layout, Row, Col, DatePicker, TimePicker, Select, Space,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { getSensors, getSensorById } from '../utils/api';
import SensorDropdown from './sensorDropdown';
import SingleSensor from './singleSensor';

const { Header, Content } = Layout;
const { Option } = Select;

// eslint-disable-next-line react/prop-types
function PickerWithType({ type, onChange }) {
	if (type === 'time') return <TimePicker onChange={onChange} />;
	if (type === 'date') return <DatePicker onChange={onChange} />;
	return <DatePicker picker={type} onChange={onChange} />;
}

function ViewSensor() {
	const [data, setData] = useState();
	const [sensorIdData, setSensorIdData] = useState();
	const [type, setType] = useState('time');
	// const [showSensorInfo, setShowSensorInfo] = useState(false);

	useEffect(() => {
		getSensors().then((res) => {
			if (!res && res === undefined) return;
			setData(res);
		});
	}, []);

	const pullData = (sensorId) => {
		getSensorById().then((res) => {
			if (!res && res === undefined) return;
			setSensorIdData(res);
			console.log(res);
		});
		console.log('id in parent:', sensorId);
	};
	// useInterval(() => {
	// 	getSensors().then((res) => {
	// 		if (!res) return;
	// 		setData(res);
	// 	});
	//   }, 1000 * 10);
	// const onClickHandler = (e) => {
	// 	//	navigate(e.key);
	// 	// setSensorId(e.key);
	// 	console.log(e);
	// 	setShowSensorInfo(true);
	// 	console.log(showSensorInfo);
	// };
	const menu = (
  <Menu>
    {data?.map((elm) => {
    	// {`/viewSensor/${elm.uid}`}
    	console.log(elm);
    	return (
      <SensorDropdown
        key={elm.uid}
        uid={elm.uid}
        sname={elm.name}
        func={pullData}
        path="/dashboard"
      />
    	);
    })}
  </Menu>
	);

	// const timeOptions = (
	// <Menu>
	//   <Menu.Item key="0">
	//     <a href="https://www.antgroup.com">Last 15 mins</a>
	//   </Menu.Item>
	//   <Menu.Item key="1">
	//     <a href="https://www.aliyun.com">Last 30 mins</a>
	//   </Menu.Item>
	//   <Menu.Divider />
	//   <Menu.Item key="3">1 hour</Menu.Item>
	// </Menu>
	// );

	return (
  <div>
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <h1>All Sensor Data</h1>
    </Header>
    {/* <Table columns={columns} dataSource={data} /> */}
    <Content style={{ margin: '10px 16px' }}>
      <Row>
        <Col span={12}>
          <Dropdown
            overlay={menu}
        // <Menu>
        //   {data?.map((elm) => {
        //     	// {`/viewSensor/${elm.uid}`}
        //     	console.log(elm);
        //     	return (
        //       <SensorDropdown
        //         key={elm.uid}
        //         uid={elm.uid}
        //         sname={elm.name}
        //         path="/dashboard"
        //       />
        //     	);
        //   })}
        // </Menu>
        // )}
            trigger={['click']}
          >
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              Select Sensor
              <DownOutlined />
            </a>
          </Dropdown>
        </Col>
        <Col span={12}>
          {/* <Dropdown overlay={timeOptions} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              Time
              {' '}
              <DownOutlined />
            </a>
          </Dropdown> */}
          <Space>
            <Select value={type} onChange={setType}>
              <Option value="time">Time</Option>
              <Option value="date">Date</Option>
              <Option value="week">Week</Option>
              <Option value="month">Month</Option>
              <Option value="quarter">Quarter</Option>
              <Option value="year">Year</Option>
            </Select>
            <PickerWithType type={type} onChange={(value) => console.log(value)} />
          </Space>
        </Col>
      </Row>
    </Content>
    ,
    {/* {showSensorInfo && <SingleSensor data={data} />} */}
    {sensorIdData && <SingleSensor data={sensorIdData} />}
  </div>
	);
}

export default ViewSensor;
