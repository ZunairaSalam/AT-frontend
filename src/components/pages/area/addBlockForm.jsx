/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
	Form,
	Input,
	Button,
	Layout,
	Row,
	Col,
	message,
} from 'antd';
import { addBlock } from '../../../utils/api';

const { Content } = Layout;

function AddBlockForm({
	setConfirmLoading, setVisibleAdd, updateStateVal, updateState,
}) {
	const onFinish = (values) => {
		setConfirmLoading(true);
		console.log(values);
		addBlock(values.blockName).then((res) => {
			if (!res) return;

			console.log(res);
			message.success(`Block Added: ${res.blockName} with id:${res.uid}`);
			setVisibleAdd(false);
			setConfirmLoading(false);
		});
		updateState(!updateStateVal);
	};

	return (
  <Layout>
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
              label="Block Name"
              name="blockName"
              rules={[
            	{
            		required: true,
            		message: 'Name cannot be empty!',
            	}]}
            >
              <Input />
            </Form.Item>

            <Row justify="center">
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">Add</Button>
              </Form.Item>
            </Row>
          </Form>
        </Col>
      </Row>
    </Content>

  </Layout>
	);
}
export default AddBlockForm;
