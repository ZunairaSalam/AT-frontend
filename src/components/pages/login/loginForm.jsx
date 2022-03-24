/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import {
	Form, Input, Button, Checkbox, Row, Col, Divider, Layout, Spin,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { sendLoginRequest, sendSignupRequest } from '../../../utils/api';
import './login.css';

const { Content } = Layout;
// eslint-disable-next-line react/prop-types
function LoginForm({ setLoginFunc }) {
	const [loading, setLoading] = useState(false);
	const [signupFlag, setSignupFlag] = useState(false);
	const onRegister = () => {
		setSignupFlag(true);
	};
	const onFinish = (values) => {
		// setAccessTokenfromApi(sendLoginRequest(values.username, values.password));
		console.log('in finish');
		setLoading(true);
		if (signupFlag) {
			sendSignupRequest(values.username, values.password).then((res) => {
				axios.defaults.headers.common.Authorization = `Bearer ${res}`;
				setLoginFunc(true);
				sessionStorage.setItem('auth-token', res);
				sessionStorage.setItem('login-flag', true);
			});
		} else {
			sendLoginRequest(values.username, values.password).then((res) => {
				axios.defaults.headers.common.Authorization = `Bearer ${res}`;
				setLoginFunc(true);
				sessionStorage.setItem('auth-token', res);
				sessionStorage.setItem('login-flag', true);
			});
		}
	};
	return (
  <Layout>
    <Content>
      <div className="site-layout-content">
        <Divider orientation="center">
          Welcome,
          {' '}
          {signupFlag === true ? 'Signup' : 'Login'}
        </Divider>
        <Row justify="center">
          <Col span={10} className="login-form-box">
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
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Enter username/email" />
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
                  placeholder="Enter Password"
                />
              </Form.Item>
              {signupFlag
              && (
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="/">
                  Forgot password
                </a>
              </Form.Item>
              )}
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  {signupFlag ? 'Signup' : 'Login'}
                </Button>
                <br />
                Or
                {' '}
                <a href="" onClick={onRegister}>register now!</a>
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
