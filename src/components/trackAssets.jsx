/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
	Typography, Row, Modal, Col, Button,
} from 'antd';
import AssetTable from './assetTable';
import AddAssetForm from './pages/addNewAsset/addAssetForm';
import UpdateAssetForm from './pages/updateAsset/updateAsset';
import './table.css';

const { Title } = Typography;

function TrackAssets() {
	const [visibleAdd, setVisibleAdd] = useState();
	const [visibleUpdate, setVisibleUpdate] = useState();
	const [confirmLoading, setConfirmLoading] = useState();
	const [modalTextAdd, setModalTextAdd] = useState(<AddAssetForm
  setConfirmLoading={setConfirmLoading}
	/>);
	const [modalTextUpdate, setModalTextUpdate] = useState();

	const [assetToUpdate, setAssetToUpdate] = useState();
	const showModalAdd = () => {
		setVisibleAdd(true);
	  };
	  const showModalUpdate = () => {
		setVisibleUpdate(true);
	  };
	// const handleOk = () => {
	// 	setModalText('The modal will be closed after two seconds');
	// 	setConfirmLoading(true);
	// 	// setTimeout(() => {
	// 	//   setVisible(false);
	// 	//   setConfirmLoading(false);
	// 	// }, 2000);
	// };

	const handleCancel = () => {
		console.log('Clicked cancel button');
		setVisibleAdd(false);
		setVisibleUpdate(false);
	};
	return (
  <span>
    <Title level={3}>All Assets</Title>
    <Row gutter={[16, 24]} justify="end">
      <Col className="gutter-row">

        <Button type="primary" onClick={showModalAdd}>Add New Asset</Button>

      </Col>
    </Row>
    <AssetTable showModalUpdate={showModalUpdate} setModalTextUpdate={setModalTextUpdate} />
    <Row justify="center">
      <Modal
        title="Add New Asset"
        visible={visibleAdd}
        // onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalTextAdd}</p>
      </Modal>

    </Row>
    <Row justify="center">
      <Modal
        title="Update Asset"
        visible={visibleUpdate}
        // onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalTextUpdate}</p>
      </Modal>

    </Row>
  </span>
	);
}

export default TrackAssets;
