/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import {
	useNavigate,
} from 'react-router-dom';
import {
	Table, Layout, Typography, Alert, Row, Button, Col, Modal, Space, Tooltip, Popconfirm, message,
} from 'antd';
import { StopOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
	getSensors, deAttachSensortoAsset, deleteSensorbyId,
} from '../../../utils/api';
// import { activeColumns } from '../utils/constants';
import '../../table.css';
import './allSensors.css';
import AddSensorForm from '../addNewSensor/addSensorForm';

const {
	Header,
} = Layout;
const { Title } = Typography;

function ActiveSensors() {
	const navigate = useNavigate();
	const [updated, setUpdated] = useState(false);
	const [visible, setVisible] = useState();
	const [confirmLoading, setConfirmLoading] = useState();
	const [modalText, setModalText] = useState(<AddSensorForm
  setConfirmLoading={setConfirmLoading}
  setVisible={setVisible}
  updateStateVal={updated}
  updateState={setUpdated}
	/>);
	const [data, setData] = useState();
	const [selectedSensorId, setSelectedSensorId] = useState();

	const confirmDelete = (uid) => {
		deleteSensorbyId(uid).then(() => {
			getSensors().then((res) => {
				if (!res) return;
				setData(res);
			});
			setUpdated(!updated);
		});
		message.success('Sensor Deleted');
	};

	const confirmRemove = (uid) => {
		setSelectedSensorId(uid);
		  deAttachSensortoAsset(uid).then((res) => {
  		if (res === 200) {
  			// setData(data.filter((elm) => elm.uid !== uid));
			  getSensors().then((response) => {
					if (!response) return;
					setData(response);
				});
			  message.success(`Sensor# ${uid} detached!`);
  		} else console.log(res);
		  });
	};

	const cancel = (e) => {
		console.log(e);
		// message.error('Click on No');
	};

	const activeColumns = [
		{
			title: 'Sensor Id',
			key: 'uid',
			dataIndex: 'uid',
		},
		{
			title: 'IMEI No',
			key: 'imei',
			dataIndex: 'imei',
		},
		{
			title: ' Sensor Name',
			key: 'name',
			dataIndex: 'name',
		},
		{
			title: 'Mac Address',
			key: 'macAddress',
			dataIndex: 'macAddress',
		},
		{
			title: ' Interval Time',
			key: 'intervalTime',
			dataIndex: 'intervalTime',
		},
		{
			title: 'Asset SKU',
			render: (record) => (record.asset !== null ? record.asset.sku : '-'),
			key: 'assetSku',
		},
		{
			title: 'Asset Type',
			render: (record) => (record.asset !== null ? record.asset.type : '-'),
			key: 'type',
		},
		{
			title: 'Asset Placement',
			render: (record) => (record.asset !== null ? record.asset.area.blockName : '-'),
			key: 'location',
		},
		{
			title: 'Action',
			key: 'action',
			render: (text, record) => (
  <Space size="middle">
    { record.asset === null ? (
      <Tooltip title="attach">
        <a
          style={{ color: 'black' }}
          onClick={() => navigate('/attachSensors')}
        >
          <PlusOutlined />
        </a>
      </Tooltip>
    )
   	: (
     <Popconfirm
       title="detach this Sensor?"
       onConfirm={() => confirmRemove(record.uid)}
       onCancel={cancel}
       okText="Yes"
       cancelText="No"
		   >
       <Tooltip title="detach">
         <a
           style={{ color: 'black' }}
         >
           <StopOutlined />

         </a>
       </Tooltip>
     </Popconfirm>
   	)}
    <Tooltip title="delete">
      <Popconfirm
        title="delete this Sensor?"
        onConfirm={() => confirmDelete(record.uid)}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <a
          style={{ color: 'black' }}
        >
          <DeleteOutlined />

        </a>
      </Popconfirm>
    </Tooltip>
  </Space>
			),
		  },
	];

	useEffect(() => {
		getSensors().then((res) => {
			if (!res) return;
			setData(res);
		});
	}, [updated]);

	const showModal = () => {
		setVisible(true);
	  };

	  const handleCancel = () => {
		console.log('Clicked cancel button');
		setVisible(false);
	  };
	return (
  <div>
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <Title level={3}>All Sensors</Title>
      {' '}
    </Header>

    <Row gutter={[16, 24]} justify="end">
      <Col className="gutter-row">

        <Button type="primary" onClick={showModal}>Add New Sensor</Button>

      </Col>
    </Row>
    <Row justify="center">
      <Modal
        title="Add New Sensor"
        visible={visible}
        // onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <p>{modalText}</p>
      </Modal>

    </Row>
    <Table className="table-striped-rows" columns={activeColumns} dataSource={data} />
  </div>
	);
}

export default ActiveSensors;
