/* eslint-disable no-debugger */
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
	CheckCircleOutlined,
	AimOutlined,
	AlertOutlined,
	BarChartOutlined,
	AppstoreAddOutlined,
	MonitorOutlined,
	EnvironmentOutlined,
	UserOutlined,
	DeploymentUnitOutlined,
} from '@ant-design/icons';
import './Home.css';
import ActiveSensors from './pages/sensors/allSensors/allSensors';
import InactiveSensors from './pages/sensors/inactiveSensors';
import AssignSensors from './pages/sensors/attachSensors/assignSensors';
import ViewSensor from './pages/sensors/viewSensorData/viewSensor';
import TrackAssets from './pages/assets/trackAssets';
import ShowVectorMap from './pages/vectorMap/showVectorMap';
import Dashboard from './pages/dashboard/dashboard';
import LoginForm from './pages/login/loginForm';
import AddSensorForm from './pages/sensors/addNewSensor/addSensorForm';
import AddAssetForm from './pages/assets/addNewAsset/addAssetForm';
import DefineArea from './pages/area/defineArea';

const {
	Header, Content, Sider, Footer,
} = Layout;
const { SubMenu } = Menu;

// eslint-disable-next-line react/prop-types
function Home({ isLoggedin }) {
	const [collapsed, setCollapsed] = useState(false);
	const [Loggedin, setLoggedin] = useState(isLoggedin);
	console.log(Loggedin);
	const navigate = useNavigate();
	const onCollapseHandler = (collapsedInput) => {
		console.log(collapsedInput);
		setCollapsed(collapsedInput);
	};

	const onClickHandler = (e) => {
		navigate(e.key);
	};
	return (
  <div>
    {sessionStorage.getItem('login-flag') === true || Loggedin
    	? (
      <Layout>
        <Header className="header">
          <span className="logo" />

          <h1>
            Asset Tracking Project
          </h1>
          <Menu theme="dark" mode="horizontal">

            <Menu.Item
              key="002"
              icon={<UserOutlined />}
              style={{ marginLeft: 'auto', color: 'white' }}
              onClick={() => {
          	setLoggedin(false);
          	sessionStorage.setItem('login-flag', false);
              }}
            >
              Logout

            </Menu.Item>

          </Menu>
          )
        </Header>
        <Layout style={{ minHeight: '85vh' }}>
          <Sider theme="dark" className="site-layout-background" collapsible collapsed={collapsed} onCollapse={onCollapseHandler}>
            <Menu defaultSelectedKeys={['/dashboard']} mode="inline" inlineIndent={10}>

              <Menu.Item key="/dashboard" icon={<ControlOutlined />} onClick={onClickHandler}>
                Dashboard
              </Menu.Item>

              <SubMenu key="/sub1" icon={<AlertOutlined />} title="Sensor Management" onClick={onClickHandler}>
                <Menu.Item key="/viewSensors" icon={<BarChartOutlined />} onClick={onClickHandler}>
                  View Sensor Data
                </Menu.Item>
                <Menu.Item key="/activeSensors" icon={<CheckCircleOutlined />} onClick={onClickHandler}>
                  All Sensors
                </Menu.Item>
                <Menu.Item key="/attachSensors" icon={<AimOutlined />} onClick={onClickHandler}>
                  Attach Sensors
                </Menu.Item>
              </SubMenu>

              <SubMenu key="/sub2" icon={<DeploymentUnitOutlined />} title="Asset Management" onClick={onClickHandler}>
                <Menu.Item key="/trackAssets" icon={<MonitorOutlined />} onClick={onClickHandler}>
                  View Assets Data
                </Menu.Item>

              </SubMenu>
              <Menu.Item key="/setArea" icon={<AppstoreAddOutlined />} onClick={onClickHandler}>
                Block Management
              </Menu.Item>
              <Menu.Item key="/showVectorMap" icon={<EnvironmentOutlined />} onClick={onClickHandler}>
                Vector Map
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
                <Route
                  path="/AT-frontend"
                  element={<Dashboard />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/addSensorForm" element={<AddSensorForm />} />
                <Route path="/viewSensors" element={<ViewSensor />} />
                <Route path="/activeSensors" element={<ActiveSensors />} />
                <Route path="/inactiveSensors" element={<InactiveSensors />} />
                <Route path="/attachSensors" element={<AssignSensors />} />
                <Route path="/addAssetForm" element={<AddAssetForm />} />
                <Route path="/setArea" element={<DefineArea />} />
                <Route path="/trackAssets" element={<TrackAssets />} />
                <Route path="/showVectorMap" element={<ShowVectorMap />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
        <Footer theme="dark" />
      </Layout>
    	) : (<LoginForm setLoginFunc={setLoggedin} />)}
    	 {/* {!isLoggedin && <LoginForm setLoginFunc={setIsLoggedin} />} */}

  </div>
	);
}
export default Home;
