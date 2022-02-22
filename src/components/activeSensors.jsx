import React, { useEffect, useState } from 'react';
import {
	Table, Layout,
} from 'antd';
import { getSensors } from '../utils/api';
import { activeColumns } from '../utils/constants';

const {
	Header,
} = Layout;

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
      <h1>Currently Active Sensors</h1>
    </Header>
    <Table columns={activeColumns} dataSource={data} />
  </div>
	);
}

export default ActiveSensors;
