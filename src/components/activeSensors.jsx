import React from 'react';
import {
	Table, Layout,
} from 'antd';

const {
	Header,
} = Layout;
const columns = [
	{
		title: 'Sensor Id',
		dataIndex: 'sensorId',
		key: 'sensorId',
		render: (text) => <a href={text}>{text}</a>,
	},
	{
		title: 'Asset Id',
		dataIndex: 'assetId',
		key: 'assetId',
	},
	{
		title: 'Zone',
		dataIndex: 'zone',
		key: 'zone',
	},
	{
		title: 'Arrival Time',
		key: 'arrivalTime',
		dataIndex: 'arrivalTime',
		//   render: tags => (
		// 	<>
		// 	  {tags.map(tag => {
		// 		let color = tag.length > 5 ? 'geekblue' : 'green';
		// 		if (tag === 'loser') {
	// 		  color = 'volcano';
	// 		}
	// 		return (
	// 		  <Tag color={color} key={tag}>
	// 			{tag.toUpperCase()}
	// 		  </Tag>
	// 		);
	// 	  })}
	// 	</>
		//   ),
	},
	{
		title: 'Time Spent',
		key: 'timeSpent',
		dataIndex: 'timeSpent',
	//   render: (text, record) => (
	// 	<Space size="middle">
	// 	  <a>Invite {record.name}</a>
	// 	  <a>Delete</a>
	// 	</Space>
	//   ),
	},
];

const data = [
	{
		key: '1',
		sensorId: '001',
		assetId: 32,
		zone: 'B',
		arrivalTime: '12:34:45',
		timeSpent: '2 Hrs',
	},
	{
		key: '2',
		sensorId: '002',
		assetId: 42,
		zone: 'C',
		arrivalTime: '12:34:45',
		timeSpent: '1 Hrs',
	},
	{
		key: '3',
		sensorId: '234',
		assetId: 12,
		zone: 'B',
		arrivalTime: '12:34:45',
		timeSpent: '2 Hrs',
	},
];

function ActiveSensors() {
	return (
  <div>
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <h1>Currently Active Sensors</h1>
    </Header>
    <Table columns={columns} dataSource={data} />
  </div>
	);
}

export default ActiveSensors;
