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
import { editBlock } from '../../../utils/api';

const { Content } = Layout;

function EditBlockForm({
	id, setConfirmLoading, setVisibleEdit, updateStateVal, updateState,
}) {
	const onFinish = (values) => {
		setConfirmLoading(true);
		console.log(values);
		editBlock(id, values.blockName).then((res) => {
			console.log(res);
			message.success(`Block Updated: ${res.blockName} with id:${res.uid}`);
			setVisibleEdit(false);
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
            >
              <Input />
            </Form.Item>

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
export default EditBlockForm;
