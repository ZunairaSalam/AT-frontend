import React, { useState } from 'react';
import {
	Form,
	Input,
	Button,
	Layout,
	// Divider,
	Row,
	Col,
	Alert,
} from 'antd';
import { addSensor } from '../../../utils/api';

const { Content } = Layout;

// eslint-disable-next-line react/prop-types
function AddSensorForm({ setConfirmLoading, setVisible }) {
	const [showAlert, setShowAlert] = useState(false);
	const [sensorImei, setSensorImei] = useState();

	const handleClose = () => {
		setShowAlert(false);
	};

	// eslint-disable-next-line no-unused-vars
	const SuccessAlert = (
  <Alert
    message="Success"
    description="Sensor added"
    type="success"
    closable
    afterClose={handleClose}
    showIcon
  />
	);
	const onFinish = (values) => {
		setConfirmLoading(true);
		console.log(values.imei, values.name, values.macAdd);
		addSensor(values.imei, values.name, values.macAdd)
			.then((res) => {
				if (!res) { setConfirmLoading(false); }
				setVisible(false);
				setShowAlert(true);
			});
		setSensorImei(values.imei);
	};

	return (
  <Layout>
    {/* <Divider orientation="center">Add New Sensor</Divider> */}
    <br />
    <Content>
      <Row justify="center" align="middle">
        <Col span={22}>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onFinish={onFinish}
          >
            <Form.Item label="IMEI No." name="imei">
              <Input />
            </Form.Item>
            <Form.Item label="name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="mac Address" name="macAdd">
              <Input />
            </Form.Item>
            {/* <Form.Item label="Type" name="type">
              <Select>
                <Select.Option value="ble">BLE</Select.Option>
                <Select.Option value="lorawan">Lorawan</Select.Option>
              </Select>
            </Form.Item> */}
            <Row justify="center">
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">Add Sensor</Button>
              </Form.Item>
            </Row>
          </Form>
        </Col>
      </Row>
    </Content>
    <Row justify="center">
      <Col>
        {showAlert && (
          <Alert
            message="Success"
            description={`Sensor# ${sensorImei} added`}
            type="success"
            closable
            afterClose={handleClose}
            showIcon
          />
        )}
      </Col>
    </Row>
  </Layout>
	);
}
export default AddSensorForm;
