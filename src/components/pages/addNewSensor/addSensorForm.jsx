/* eslint-disable react/prop-types */
import React from 'react';
import {
	Form,
	Input,
	Button,
	Layout,
	// Divider,
	Row,
	Col,
	message,
} from 'antd';
import { addSensor } from '../../../utils/api';

const { Content } = Layout;

// eslint-disable-next-line react/prop-types
function AddSensorForm({
	setConfirmLoading, setVisible, updateStateVal, updateState,
}) {
	const onFinish = (values) => {
		setConfirmLoading(true);
		console.log(values.imei, values.name, values.macAdd);
		addSensor(values.imei, values.name, values.macAdd)
			.then((res) => {
				if (!res) {
					console.log('**************');
					setConfirmLoading(false);
				} else if (res === 201) {
					setVisible(false);
					setConfirmLoading(false);

					console.log(res);
					message.success('Sensor Added!');
				} else { message.error('Oops Something wrong!'); }
			});
		// setSensorImei(values.imei);
		updateState(!updateStateVal);
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
            <Form.Item
              label="IMEI No."
              name="imei"
              rules={[
            	{
            		required: true,
            		message: 'IMEI cannot be empty!',
            	},
              	{ min: 15, message: 'IMEI must be minimum 15 characters.' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="name"
              name="name"
              rules={[
            	{
            		required: true,
            		message: 'Name cannot be empty!',
            	},
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="mac Address"
              name="macAdd"
              rules={[
            	{
            		required: true,
            		message: 'mac address cannot be empty!',
            	},
              	{ min: 19, message: 'mac address must be minimum 19 characters.' },
              ]}
            >
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
  </Layout>
	);
}
export default AddSensorForm;
