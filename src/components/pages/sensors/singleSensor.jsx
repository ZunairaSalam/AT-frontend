import React from 'react';
import { Table } from 'antd';
import { columns } from '../../../utils/constants';

// eslint-disable-next-line react/prop-types
function SingleSensor({ data }) {
	const onChange = () => {
		console.log(data);
		// console.log('sorter', sorter)
	};
	return (

  <Table
    columns={columns}
    dataSource={data}
    onChange={onChange}
    pagination={{ pageSize: 6 }}
  />

	);
}
export default SingleSensor;
