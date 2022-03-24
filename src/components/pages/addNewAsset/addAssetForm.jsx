/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
	Form,
	Input,
	Button,
	Select,
	Layout,
	// Divider,
	Row,
	Col,
	Alert,
} from 'antd';
import { addAsset } from '../../../utils/api';

const { Content } = Layout;

function AddAssetForm({ setConfirmLoading }) {
	const [showAlert, setShowAlert] = useState(false);
	const [assetId, setAssetId] = useState();
	const onFinish = (values) => {
		setConfirmLoading(true);
		console.log(values.sku, values.type, values.placement);
		addAsset(values.sku, values.type, values.placement);
		setAssetId(values.sku);
		setShowAlert(true);
	};
	const handleClose = () => {
		setShowAlert(false);
	};
	return (
  <Layout>
    {/* <Divider orientation="center">Add New Asset</Divider> */}
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
            <Form.Item label="Asste SKU" name="sku">
              <Input />
            </Form.Item>
            <Form.Item label="Type" name="type">
              <Select>
                <Select.Option value="Container 2021">Container 2021</Select.Option>
                <Select.Option value="Container 2022">Container 2022</Select.Option>
              </Select>
            </Form.Item>
            {/* <Form.Item label="Description" name="description">
              <Input />
            </Form.Item> */}
            <Form.Item label="Placement" name="placement">
              <Select>
                <Select.Option value="Zone A">Zone A</Select.Option>
                <Select.Option value="Zone B">Zone B</Select.Option>
                <Select.Option value="Zone C">Zone C</Select.Option>
                <Select.Option value="Zone D">Zone D</Select.Option>
              </Select>
            </Form.Item>
            {/* <Form.Item style={{ alignContent: 'center' }}>
              <Button type="primary" htmlType="submit" className="login-form-button">ADD</Button>
            </Form.Item> */}
            <Row justify="center">
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">Add Asset</Button>
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
            description={`Asset# ${assetId} added`}
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
export default AddAssetForm;
