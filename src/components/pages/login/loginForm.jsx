import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import {
	Form, Input, Button, Checkbox, Row, Col, Divider, Layout, Spin,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { sendLoginRequest } from '../../../utils/api';
import './login.css';

const { Content } = Layout;
// eslint-disable-next-line react/prop-types
function LoginForm({ setLoginFunc }) {
	const [loading, setLoading] = useState(false);
	// const navigate = useNavigate();
	// const [accessTokenfromApi, setAccessTokenfromApi] = useState();
	const onFinish = (values) => {
		// setAccessTokenfromApi(sendLoginRequest(values.username, values.password));
		setLoading(true);
		sendLoginRequest(values.username, values.password).then((res) => {
			axios.defaults.headers.common.Authorization = `Bearer ${res}`;
			setLoginFunc(true);
			sessionStorage.setItem('auth-token', res);
			sessionStorage.setItem('login-flag', true);
		});
	};
	return (
  <Layout>
    <Content>
      <div className="site-layout-content">
        <Divider orientation="center">Welcome, Login</Divider>
        <Row justify="center">
          <Col span={10}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
      	remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
        	{
        		required: true,
        		message: 'Please input your Username!',
        	},
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
        	{
        		required: true,
        		message: 'Please input your Password!',
        	},
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="/">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        {loading ? <Spin tip="Loading..." /> : ''}
      </div>
    </Content>
  </Layout>
	);
}
export default LoginForm;
