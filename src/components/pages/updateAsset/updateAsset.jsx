/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
	Form,
	Input,
	Button,
	Select,
	Layout,
	Divider,
	Row,
	Col,
	Alert,
	message,
} from 'antd';
import { updateAsset } from '../../../utils/api';

const { Content } = Layout;

function UpdateAssetForm({ id, updateState }) {
	const [showAlert, setShowAlert] = useState(false);
	const [assetId, setAssetId] = useState(id);

	const onFinish = (values) => {
		console.log(values.sku, values.type, values.placement);
		updateAsset(id, values.type, values.placement)
			.then((res) => {
				if (res === 200) updateState(true);
				else console.log(res);
				message.success(`Asset with sku#${values.sku} updated!`);
			});
	};

	return (
  <Layout>
    {/* <Divider orientation="center">Update Asset</Divider> */}
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
            <Form.Item label="Asste Id" name="sku">
              <Input defaultValue={assetId} disabled />
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
                <Button type="primary" htmlType="submit" className="login-form-button">Update</Button>
              </Form.Item>
            </Row>
          </Form>
        </Col>
      </Row>
    </Content>

  </Layout>
	);
}
export default UpdateAssetForm;
