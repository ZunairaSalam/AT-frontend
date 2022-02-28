import React, { useEffect, useState } from 'react';
import {
	Table, Layout, Typography,
} from 'antd';
import { getSensors } from '../utils/api';
import { activeColumns } from '../utils/constants';

const {
	Header,
} = Layout;
const { Title } = Typography;
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

//   render: (text, record) => (
// 	<Space size="middle">
// 	  <a>Invite {record.name}</a>
// 	  <a>Delete</a>
// 	</Space>
//   ),

function ActiveSensors() {
	// this chunk is used in multiple components !!!!reuse
	const [data, setData] = useState();
	useEffect(() => {
		getSensors().then((res) => {
			if (!res) return;
			const activeSensors = res?.filter((value) => value.asset !== null);
			if (activeSensors) {
				console.log(activeSensors);
				setData(activeSensors);
			}
		});
	}, []);
	return (
  <div>
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <Title level={3}>Currently Active Sensors</Title>
    </Header>
    <Table columns={activeColumns} dataSource={data} />
  </div>
	);
}

export default ActiveSensors;
