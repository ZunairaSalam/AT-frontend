/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';

import {
	Routes,
	Route,
	useNavigate,
} from 'react-router-dom';
import {
	ControlOutlined,
	ExclamationCircleOutlined,
	CheckCircleOutlined,
	AimOutlined,
	AlertOutlined,
	BarChartOutlined,
	MinusOutlined,
	MonitorOutlined,
	EnvironmentOutlined,
} from '@ant-design/icons';
import './Home.css';
import ActiveSensors from './activeSensors';
import InactiveSensors from './inactiveSensors';
import RemoveSensors from './removeSensor';
import AssignSensors from './assignSensors';
import ViewSensor from './viewSensor';
import TrackAssets from './trackAssets';
import ShowMap from './showMap';
import Dashboard from './dashboard';
import LoginForm from './loginForm';

const {
	Header, Content, Sider, Footer,
} = Layout;
//	Content, Footer
// const { Title } = Typography;
const { SubMenu } = Menu;

function Home() {
	const [collapsed, setCollapsed] = useState(false);
	const [isLoggedin, setIsLoggedin] = useState(false);
	console.log(isLoggedin);
	//	const [visibleComp, setvisibleComp] = useState('1');
	const navigate = useNavigate();
	const onCollapseHandler = (collapsedInput) => {
		console.log(collapsedInput);
		setCollapsed(collapsedInput);
	};

	const onClickHandler = (e) => {
		navigate(e.key);
		// setvisibleComp(e.key);
	};
	return (
  <Layout>
    <Header theme="dark" className="header">
      {/* <div className="logo" /> */}
      {/* <img src={logo} alt="A" className="logo" /> */}
      {/* <h1 style={{ color: 'white' }}>SSET TRACKING PROJECT</h1> */}
      <span className="logo" />
      <h1>
        ASSET TRACKING PROJECT
      </h1>
      {isLoggedin && (
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="001" style={{ marginLeft: 'auto', backgroundColor: 'DodgerBlue' }} onClick={() => setIsLoggedin(!isLoggedin)}>{isLoggedin ? 'Logout' : 'Login'}</Menu.Item>
      </Menu>
      )}
    </Header>
    {isLoggedin
    	&& (
      <Layout style={{ minHeight: '92vh' }}>
        <Sider className="site-layout-background" collapsible collapsed={collapsed} onCollapse={onCollapseHandler}>
          <Menu defaultSelectedKeys={['1']} mode="inline">

            <Menu.Item key="/dashboard" icon={<ControlOutlined />} onClick={onClickHandler}>
              Dashboard
            </Menu.Item>

            <Menu.Item key="/viewSensors" icon={<BarChartOutlined />} onClick={onClickHandler}>
              View Sensor Data
            </Menu.Item>

            <SubMenu key="/sub1" icon={<AlertOutlined />} title="Sensors" onClick={onClickHandler}>

              <Menu.Item key="/activeSensors" icon={<CheckCircleOutlined />} onClick={onClickHandler}>
                Active Sensors
              </Menu.Item>

              <Menu.Item key="/inactiveSensors" icon={<ExclamationCircleOutlined />} onClick={onClickHandler}>
                InActive Sensors
              </Menu.Item>

              <Menu.Item key="/attachSensors" icon={<AimOutlined />} onClick={onClickHandler}>
                Attach Sensors
              </Menu.Item>

              <Menu.Item key="/detachSensors" icon={<MinusOutlined />} onClick={onClickHandler}>
                Detach Sensors
              </Menu.Item>

            </SubMenu>

            <Menu.Item key="/trackAssets" icon={<MonitorOutlined />} onClick={onClickHandler}>
              View Assets Data
            </Menu.Item>

            <Menu.Item key="/showmap" icon={<EnvironmentOutlined />} onClick={onClickHandler}>
              Map
            </Menu.Item>

          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
            	margin: '24px 16px',
            	padding: 24,
            	minHeight: 280,
            }}
          >
            <Routes>
              <Route
                path="/"
                element={<Dashboard />}
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/viewSensors" element={<ViewSensor />} />
              <Route path="/activeSensors" element={<ActiveSensors />} />
              <Route path="/inactiveSensors" element={<InactiveSensors />} />
              <Route path="/attachSensors" element={<AssignSensors />} />
              <Route path="/detachSensors" element={<RemoveSensors />} />
              <Route path="/trackAssets" element={<TrackAssets />} />
              <Route path="/showMap" element={<ShowMap />} />
              {/* <Route path="/view/edit/:id" element={<EditBle />} />
      <Route path="/canvas" element={<Canvas />} /> */}
            </Routes>
          </Content>
          <Footer theme="dark">
            Systems Ltd
            <div><a href="https://www.systemsltd.com/">About Us</a></div>
          </Footer>
        </Layout>
      </Layout>
    	)}
    	 {!isLoggedin && <LoginForm setLoginFunc={setIsLoggedin} />}
  </Layout>
	);
}
export default Home;
