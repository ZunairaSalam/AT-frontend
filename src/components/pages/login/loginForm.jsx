/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import axios from 'axios';

import {
	Form, Input, Button, Checkbox, Row, Col,
	Spin,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { sendLoginRequest, sendSignupRequest } from '../../../utils/api';
import './login.css';

// eslint-disable-next-line react/prop-types
function LoginForm({ setLoginFunc, signupFlag, setSignupFlag }) {
	const [loading, setLoading] = useState(false);
	//	const [isSignedIn, setIsSignedIn] = useState(false);

	// const [signupFlag, setSignupFlag] = useState(false);
	const onRegister = () => {
		debugger;
		sessionStorage.setItem('signup-flag', true);
		setSignupFlag(true);
	};
	const onFinish = (values) => {
		// setAccessTokenfromApi(sendLoginRequest(values.username, values.password));
		console.log('in finish');
		setLoading(true);
		if (signupFlag === true) {
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
	// <Layout>
	//   <Content>
  <div className="site-layout-content">
    <Row justify="center" align="middle" className="center-row">
      <Col span={7} className="login-form-box">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
      	remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item>
            <span className="ant-form-text">Asset Tracking Project</span>
          </Form.Item>
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
          {/* {!signupFlag
          	? ( */}
          <span>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                {signupFlag ? 'Signup' : 'Login' }
              </Button>
              <br />
              {!signupFlag && (
                <span>
                  {' Or '}
                  <a href="" onClick={() => { onRegister(); }}>signup now!</a>
                </span>
              )}
            </Form.Item>
          </span>
          	{/* // )
          	// : (
            // <Form.Item>
            //   <Button type="primary" htmlType="submit" className="login-form-button">
            //     Signup
            //   </Button>
            // </Form.Item>
          	// )} */}
        </Form>
        {loading ? <Spin tip="Loading..." /> : ''}
      </Col>
    </Row>
  </div>
	//   </Content>
	// </Layout>
	);
}
export default LoginForm;
