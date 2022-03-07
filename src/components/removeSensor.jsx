/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import {
	Menu, Dropdown, Row, Col, Button, Alert, Typography,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { getSensors, deAttachSensortoAsset } from '../utils/api';
import './table.css';

const { Title } = Typography;
function RemoveSensors() {
	const [sensorData, setSensorData] = useState();
	const [selectedSensorId, setSelectedSensorId] = useState();
	const [showAlert, setShowAlert] = useState(0);
	useEffect(() => {
		getSensors().then((res) => {
			if (!res) return;
			const ActiveSensors = res?.filter((value) => value.asset !== null);
			if (ActiveSensors) {
				setSensorData(ActiveSensors);
				console.log(ActiveSensors);
			}
		});
	}, []);
	const handleSensorSelect = (id) => {
		setSelectedSensorId(id);
	};
	const handleSubmit = () => {
		console.log('submit');
		deAttachSensortoAsset(selectedSensorId).then((res) => {
			if (res === 200) setShowAlert(1);
			else if (res === 409) { console.log(res); setShowAlert(2); } else console.log(res);
		});
	};
	const handleClose = () => {
		setShowAlert(false);
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
	return (
  <div>

    <Title level={3}>DeAttach Sensors from assets</Title>
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
      <Col span={2}>
        <Button type="primary" disabled={!(selectedSensorId)} onClick={() => handleSubmit()}>Submit</Button>
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

export default RemoveSensors;
