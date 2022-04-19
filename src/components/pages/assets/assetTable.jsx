/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
	useNavigate,
} from 'react-router-dom';
import {
	Table, Space, Tooltip, Popconfirm, message,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import { assetColumns } from '../utils/constants';
import { getAssets, deleteAssetbyId } from '../../../utils/api';
import UpdateAssetForm from './updateAsset/updateAsset';

function AssetTable({
	showModalUpdate, setModalTextUpdate, updateStateVal, updateState, setVisibleUpdate,
}) {
	const [data, setData] = useState();
	const [assetIdtoUpdate, setAssetIdToUpdate] = useState();
	// const [updated, setUpdated] = useState(updateStateVal);
	const navigate = useNavigate();
	const confirmDelete = (uid) => {
		deleteAssetbyId(uid)
		  .then(() => {
			  console.log('asset deleted:', uid);
			  getAssets().then((res) => {
				  if (!res) return;
				  setData(res);
				  console.log(res);
			  });
		  });
		  message.success(`Asset ${uid} deleted`);
	};

	const cancel = (e) => {
		console.log(e);
		// message.error('Click on No');
	};

	const assetColumns = [
		{
			title: 'Asset Sku',
			dataIndex: 'sku',
			key: 'assetSku',
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'assetType',
		},
		{
			title: 'Area',
			dataIndex: 'area',
			key: 'area',
			render: (record) => (record !== null ? record.blockName : '-'),
		},
		{
			title: 'Sensor',
			dataIndex: 'sensor',
			render: (record) => (record !== null ? record.name : (
  <a
    onClick={() => { navigate('/attachSensors'); }}
  >
    Attach Sensor
  </a>
			)),
			key: 'suid',
			filters: [
				{
				  text: 'attached',
				  value: 'attached',
				},
				{
				  text: 'Not attached',
				  value: null,
				},
			  ],
			  onFilter: (value, record) => (value === null
				? (record.sensor === null) : (record.sensor !== null)),
		},
		{
			title: 'Action',
			key: 'action',
			render: (text, record) => (
  <Space size="middle">
    <Tooltip title="edit">
      <a
        style={{ color: 'black' }}
        onClick={() => {
  	setAssetIdToUpdate(record.uid);
	  // prev used setupdated of this component
				  setModalTextUpdate(<UpdateAssetForm
  id={record.uid}
  updateState={updateState}
  setVisibleUpdate={setVisibleUpdate}
				  />);
				  showModalUpdate();
				 console.log(record);
        }}
      >
        <EditOutlined />
      </a>
    </Tooltip>
    {record.sensor !== null ? (
      <Tooltip title="detach sensor from asset to delete">
        <a
          style={{ color: '#a1a0a0' }}
        >
          <DeleteOutlined />

        </a>
      </Tooltip>
    )
    	: (
      <Popconfirm
        title="delete this Asset?"
        onConfirm={() => confirmDelete(record.uid)}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Tooltip title="delete">
          <a
            style={{ color: 'black' }}
          >
            <DeleteOutlined />

          </a>
        </Tooltip>
      </Popconfirm>
    	)}

  </Space>
			),
		  },
	];
	useEffect(() => {
		getAssets().then((res) => {
			if (!res) return;
			setData(res);
			console.log(res);
		});
	}, [updateStateVal]);// prev 'updated' defined in this component
	return (

  <Table
    columns={assetColumns}
    dataSource={data}
    bordered
    // onRow={(record, rowIndex) => ({
	// 	  onClick: (event) => {
	// 		  setAssetIdToUpdate(record.id);
	// 		  setModalTextUpdate(<UpdateAssetForm id={record.id} />);
	// 		  showModalUpdate();
	// 		 console.log(record);
	// 	  },
    // })}
  />

	);
}
export default AssetTable;
