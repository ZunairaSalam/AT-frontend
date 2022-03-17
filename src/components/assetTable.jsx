/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { assetColumns } from '../utils/constants';
import { getAssets } from '../utils/api';
import UpdateAssetForm from './pages/updateAsset/updateAsset';

function AssetTable({ showModalUpdate, setModalTextUpdate }) {
	const [data, setData] = useState();
	const [assetIdtoUpdate, setAssetIdToUpdate] = useState();

	useEffect(() => {
		getAssets().then((res) => {
			if (!res) return;
			setData(res);
		});
	}, []);
	return (

  <Table
    columns={assetColumns}
    dataSource={data}
    bordered
    onRow={(record, rowIndex) => ({
		  onClick: (event) => {
			  setAssetIdToUpdate(record.id);
			  setModalTextUpdate(<UpdateAssetForm id={record.id} />);
			  showModalUpdate();
			 console.log(record);
		  },
    })}
  />

	);
}
export default AssetTable;
