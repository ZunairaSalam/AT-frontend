import React from 'react';
import { Table } from 'antd';
import { columns } from '../utils/constants';

function SingleSensor(data) {
	return (

		data && (
<Table
  columns={columns}
  dataSource={data}
/>
		)

	);
}
export default SingleSensor;
