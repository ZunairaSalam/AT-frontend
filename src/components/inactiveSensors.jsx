import React, { useEffect, useState } from 'react';
import {
	Table, Layout,
} from 'antd';
import { getSensors } from '../utils/api';
import { inActiveColumns } from '../utils/constants';

const {
	Header,
} = Layout;

function InactiveSensors() {
	const [data, setData] = useState();
	useEffect(() => {
		getSensors().then((res) => {
			if (!res) return;
			const inActiveSensors = res?.filter((value) => value.asset === null);
			if (inActiveSensors) {
				console.log(inActiveSensors);
				setData(inActiveSensors);
			}
		});
	}, []);
	return (
  <div>
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <h1>Currently InActive Sensors</h1>
    </Header>
    <Table columns={inActiveColumns} dataSource={data} />
  </div>
	);
}

export default InactiveSensors;
