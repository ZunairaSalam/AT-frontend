/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import {
	Menu, Dropdown, Row, Col, Button, Alert, Typography,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { getSensors, getAssets, attachSensortoAsset } from '../utils/api';

const { Title } = Typography;
function AssignSensors() {
	const [sensorData, setSensorData] = useState();
	const [selectedSensorId, setSelectedSensorId] = useState();
	const [assetData, setAssetData] = useState();
	const [selectedAssetId, setSelectedAssetId] = useState();
	const [showAlert, setShowAlert] = useState(0);
	useEffect(() => {
		getSensors().then((res) => {
			if (!res) return;
			const inActiveSensors = res?.filter((value) => value.asset === null);
			if (inActiveSensors) {
				setSensorData(inActiveSensors);
				console.log(inActiveSensors);
			}
		});

		getAssets().then((res) => {
			if (!res) return;
			const availableAssets = res?.filter((value) => value.sensor === null);
			if (availableAssets) {
				setAssetData(availableAssets);
				console.log(availableAssets);
			}
		});
	}, []);
	const handleSensorSelect = (id) => {
		setSelectedSensorId(id);
		console.log('handleSensorSelect: ', id);
	};
	const handleAssetSelect = (id) => {
		setSelectedAssetId(id);
		console.log('handleAssetSelect: ', id);
	};
	const handleSubmit = () => {
		console.log('submit');
		attachSensortoAsset(selectedSensorId, selectedAssetId).then((res) => {
			if (res === 200) setShowAlert(1);
			else if (res === 409) { console.log(res); setShowAlert(2); } else console.log(res);
		});
	};
	const sensorList = (
  <Menu>
    {sensorData?.map((elm) => (
      <Menu.Item
        key={elm.uid}
        onClick={() => { handleSensorSelect(elm.uid); }}
      >
        id:
        {' '}
        {elm.uid}
        {', '}
        name:
        {' '}
        {elm.name}
      </Menu.Item>
			  ))}
  </Menu>
	);

	const assetList = (
  <Menu>
    {assetData?.map((elm) => (
      <Menu.Item
        key={elm.id}
        onClick={() => { handleAssetSelect(elm.id); }}
      >
        id:
        {' '}
        {elm.id}
        {', '}
        type:
        {' '}
        {elm.type}
        {', '}
        location:
        {' '}
        {elm.location}
      </Menu.Item>
		  ))}
  </Menu>
		  );

	const handleClose = () => {
		setShowAlert(false);
	};

	const SuccessAlert = (
  <Alert
    message="Success"
    description={`Sensor# ${selectedSensorId} attached to Asset# ${selectedAssetId}`}
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
	return (
  <div>

    <Title level={3}>Attach Sensors to assets</Title>
    <Row>
      <span>Sensor:</span>
      <Col span={6}>
        <Dropdown
          overlay={sensorList}
          trigger={['click']}
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            {selectedSensorId || 'Select Sensor'}
            <DownOutlined />
          </a>
        </Dropdown>
      </Col>
      <span>Asset:</span>
      <Col span={6}>
        <Dropdown
          overlay={assetList}
          trigger={['click']}
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            {selectedAssetId || 'Select Asset'}
            <DownOutlined />
          </a>
        </Dropdown>
      </Col>
      <Col span={2}>
        <Button type="primary" disabled={!((selectedSensorId && selectedAssetId))} onClick={() => handleSubmit()}>Submit</Button>
      </Col>
    </Row>
    <Row>
      {' '}
      {showAlert === 1
      	? (SuccessAlert) : showAlert === 2 ? FailedAlert : null}

    </Row>

  </div>
	);
}

export default AssignSensors;