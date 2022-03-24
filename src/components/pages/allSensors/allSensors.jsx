/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import {
	Table, Layout, Typography, Alert, Row, Button, Col, Modal,
} from 'antd';
import { getSensors, deAttachSensortoAsset } from '../../../utils/api';
// import { activeColumns } from '../utils/constants';
import '../../table.css';
import './allSensors.css';
import AddSensorForm from '../addNewSensor/addSensorForm';

const {
	Header,
} = Layout;
const { Title } = Typography;
function ActiveSensors() {
	const [visible, setVisible] = useState();
	const [confirmLoading, setConfirmLoading] = useState();
	const [modalText, setModalText] = useState(<AddSensorForm
  setConfirmLoading={setConfirmLoading}
  setVisible={setVisible}
	/>);
	const [data, setData] = useState();
	const [showAlert, setShowAlert] = useState(0);
	const [selectedSensorId, setSelectedSensorId] = useState();

	const activeColumns = [
		{
			title: 'Sensor Id',
			key: 'uid',
			dataIndex: 'uid',
		},
		{
			title: ' Sensor Name',
			key: 'name',
			dataIndex: 'name',
		},
		{
			title: ' Interval Time',
			key: 'intervalTime',
			dataIndex: 'intervalTime',
		},
		{
			title: 'Asset id',
			render: (record) => (record.asset !== null ? record.asset.id : '-'),
			key: 'assetId',
		},
		{
			title: 'Asset Type',
			render: (record) => (record.asset !== null ? record.asset.type : '-'),
			key: 'type',
		},
		{
			title: 'Asset Placement',
			render: (record) => (record.asset !== null ? record.asset.location : '-'),
			key: 'location',
		},
		{
			title: 'Action',
			key: 'action',
			render: (text, record) => (
				record.asset === null ? (
  <a style={{ color: 'Green' }} href="/attachSensors">
    Attach
  </a>
				)
					: (
  <a
    style={{ color: 'Red' }}
    onClick={() => {
  	setSelectedSensorId(record.uid);
		  deAttachSensortoAsset(record.uid).then((res) => {
  		if (res === 200) {
  			setData(data.filter((elm) => elm.uid !== record.uid));
  			setShowAlert(1);
  		} else if (res === 409) { console.log(res); setShowAlert(2); } else console.log(res);
		  });
    }}
  >
    Detach

  </a>
					)
			),
		  },
	];
	// this chunk is used in multiple components !!!!reuse

	useEffect(() => {
		getSensors().then((res) => {
			if (!res) return;
			// const activeSensors = res?.filter((value) => value.asset !== null);
			// if (activeSensors) {
			// 	console.log(activeSensors);
			// 	setData(activeSensors);
			// }
			setData(res);
		});
	}, []);
	const handleClose = () => {
		setShowAlert(false);
	};

	const SuccessAlert = (
  <Alert
    message="Success"
    description={`Sensor# ${selectedSensorId} detached`}
    type="success"
    closable
    afterClose={handleClose}
    showIcon
		/>
	);

	const FailedAlert = (
  <Alert
    message="Error"
    description={`Sensor# ${selectedSensorId} already attached`}
    type="error"
    closable
    afterClose={handleClose}
    showIcon
		/>
	);

	const showModal = () => {
		setVisible(true);
	  };

	// const handleOk = () => {
	// 	setModalText('The modal will be closed after two seconds');
	// 	setConfirmLoading(true);
	// 	// setTimeout(() => {
	// 	//   setVisible(false);
	// 	//   setConfirmLoading(false);
	// 	// }, 2000);
	//   };

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
      >
        <p>{modalText}</p>
      </Modal>

    </Row>
    <Table className="table-striped-rows" columns={activeColumns} dataSource={data} />
    <Row justify="center">
      {' '}
      {showAlert === 1
      	? (SuccessAlert) : showAlert === 2 ? FailedAlert : null}

    </Row>
  </div>
	);
}

export default ActiveSensors;
