/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import {
	Row, Col, Button, Typography, Table, message,
} from 'antd';
import { PlusSquareTwoTone } from '@ant-design/icons';
import { attachSensorColumns, attachAssetColumns } from '../../../../utils/constants';
import { getSensors, getAssets, attachSensortoAsset } from '../../../../utils/api';

import '../../../table.css';

const { Title } = Typography;
function AssignSensors() {
	const [sensorData, setSensorData] = useState();
	const [selectedSensorId, setSelectedSensorId] = useState();
	const [assetData, setAssetData] = useState();
	const [selectedAssetId, setSelectedAssetId] = useState();
	const [selectedRow1, setSelectedRow1] = useState();
	const [selectedRow2, setSelectedRow2] = useState();
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
			if (res?.status === 200) {
				setSensorData(sensorData.filter((elm) => elm.uid !== selectedSensorId));
				setAssetData(assetData.filter((elm) => elm.uid !== selectedAssetId));
				message.success(`Sensor# ${selectedSensorId} attached to Asset# ${selectedAssetId}`);
			} else {
				message.error(`Error occured: ${res.status}`);
			}
		});
	};
	return (
  <div>

    <Title level={3}>Attach Sensors to Asset</Title>
    <Row style={{ alignItems: 'center' }}>
      <Col span={10}>
        <Table
          className="table-striped-rows hover-table"
          columns={attachSensorColumns}
          dataSource={sensorData}
          pagination={{ pageSize: 4 }}
          onRow={(record, rowIndex) => ({
          	onClick: () => {
          		setSelectedRow1(rowIndex);
          		handleSensorSelect(record.uid);
          	console.log(record, rowIndex);
          	},
          })}
          rowClassName={(record, index) => {
          	if (index === selectedRow1) return 'selectedRowStyle';
          	return 'normalRowStyle';
          }}
        />
      </Col>
      <Col span={4}>
        <PlusSquareTwoTone style={{ fontSize: '48px' }} twoToneColor="#002140" />
      </Col>
      <Col span={10}>
        <Table
          className="hover-table"
          columns={attachAssetColumns}
          dataSource={assetData}
          pagination={{ pageSize: 4 }}
          onRow={(record, rowIndex) => ({
        	onClick: () => {
          		setSelectedRow2(rowIndex);
        		handleAssetSelect(record.uid);
        		console.log(record, rowIndex);
        	},
          })}
          rowClassName={(record, index) => {
          	if (index === selectedRow2) return 'selectedRowStyle';
          	return 'normalRowStyle';
          }}
        />
      </Col>
    </Row>
    <Row justify="center">
      <Col span={2}>
        <Button type="primary" disabled={!(selectedSensorId && selectedAssetId)} onClick={() => handleSubmit()}>Submit</Button>
      </Col>
    </Row>

  </div>
	);
}

export default AssignSensors;
