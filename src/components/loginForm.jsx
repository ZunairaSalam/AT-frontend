import React from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import {
	Form, Input, Button, Checkbox, Row, Col, Divider,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { sendLoginRequest } from '../utils/api';
// eslint-disable-next-line react/prop-types
function LoginForm({ setLoginFunc }) {
	// const navigate = useNavigate();
	// const [accessTokenfromApi, setAccessTokenfromApi] = useState();
	const onFinish = (values) => {
		// setAccessTokenfromApi(sendLoginRequest(values.username, values.password));

		sendLoginRequest(values.username, values.password).then((res) => {
			console.log(res);
			axios.defaults.headers.common.Authorization = `Bearer ${res}`;
			setLoginFunc(true);
		});
	};
	return (
  <span>
    <Divider orientation="center">Welcome, Login</Divider>
    <Row>
      <Col span={10} offset={7}>
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
  </span>
	);
}
export default LoginForm;
