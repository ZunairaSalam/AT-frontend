import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { assetColumns } from '../utils/constants';
import { getSensors } from '../utils/api';

// eslint-disable-next-line react/prop-types
function AssetTable() {
	// eslint-disable-next-line no-unused-vars
	const [data, setData] = useState();
	useEffect(() => {
		getSensors().then((res) => {
			if (!res) return;
			setData(res);
			const activeSensors = res?.filter((value) => value.asset !== null);
			setData(activeSensors);
		});
	}, []);

	const display = data?.map((elm) => (elm.asset));
	return (

  <Table
    columns={assetColumns}
    dataSource={display}
    // onChange={onChange}
    // pagination={{ pageSize: 10 }}
  />

	);
}
export default AssetTable;
