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
	// ExclamationCircleOutlined,
	CheckCircleOutlined,
	AimOutlined,
	AlertOutlined,
	BarChartOutlined,
	// PlusCircleOutlined,
	// MinusOutlined,
	MonitorOutlined,
	EnvironmentOutlined,
	UserOutlined,
	DeploymentUnitOutlined,
} from '@ant-design/icons';
import './Home.css';
import ActiveSensors from './pages/allSensors/allSensors';
import InactiveSensors from './inactiveSensors';
// import RemoveSensors from './removeSensor';
import AssignSensors from './pages/attachSensors/assignSensors';
import ViewSensor from './pages/viewSensorData/viewSensor';
import TrackAssets from './trackAssets';
// import ShowMap from './showMap';
import ViewMap from './viewMap';
import Dashboard from './pages/dashboard/dashboard';
import LoginForm from './pages/login/loginForm';
import AddSensorForm from './pages/addNewSensor/addSensorForm';
import AddAssetForm from './pages/addNewAsset/addAssetForm';

const {
	Header, Content, Sider, Footer,
} = Layout;
//	Content, Footer
// const { Title } = Typography;
const { SubMenu } = Menu;

function Home() {
	const [collapsed, setCollapsed] = useState(false);
	const [isLoggedin, setIsLoggedin] = useState(!!sessionStorage.getItem('login-flag'));
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
    <Header className="header">
      {/* <div className="logo" /> */}
      {/* <img src={logo} alt="A" className="logo" /> */}
      {/* <h1 style={{ color: 'white' }}>SSET TRACKING PROJECT</h1> */}
      <span className="logo" />

      <h1>
        Asset Tracking Project
      </h1>
      <Menu theme="dark" mode="horizontal">
        {/* <Menu.Item key="001" icon={<UserAddOutlined />}
        style={{ marginLeft: 'auto', color: 'white' }}
        onClick={() => console.log('signup')}>Signup</Menu.Item> */}
        {isLoggedin
        && (
        <Menu.Item
          key="002"
          icon={<UserOutlined />}
          style={{ marginLeft: 'auto', color: 'white' }}
          onClick={() => {
          	setIsLoggedin(false);
          	sessionStorage.setItem('login-flag', false);
          }}
        >
          Logout

        </Menu.Item>
        )}
      </Menu>
      )
    </Header>
    {sessionStorage.getItem('login-flag') === true || isLoggedin
    	? (
      <Layout style={{ minHeight: '85vh' }}>
        <Sider theme="dark" className="site-layout-background" collapsible collapsed={collapsed} onCollapse={onCollapseHandler}>
          <Menu defaultSelectedKeys={['1']} mode="inline">

            <Menu.Item key="/dashboard" icon={<ControlOutlined />} onClick={onClickHandler}>
              Dashboard
            </Menu.Item>

            <SubMenu key="/sub1" icon={<AlertOutlined />} title="Sensors Details" onClick={onClickHandler}>
              <Menu.Item key="/viewSensors" icon={<BarChartOutlined />} onClick={onClickHandler}>
                View Sensor Data
              </Menu.Item>
              {/* <Menu.Item key="/addSensorForm" icon={<PlusCircleOutlined />}
              onClick={onClickHandler}>
                Add new Sensor
              </Menu.Item> */}
              <Menu.Item key="/activeSensors" icon={<CheckCircleOutlined />} onClick={onClickHandler}>
                All Sensors
              </Menu.Item>

              {/* <Menu.Item key="/inactiveSensors" icon={<ExclamationCircleOutlined />}
              onClick={onClickHandler}>
                InActive Sensors
              </Menu.Item> */}

              <Menu.Item key="/attachSensors" icon={<AimOutlined />} onClick={onClickHandler}>
                Attach Sensors
              </Menu.Item>

              {/* <Menu.Item key="/detachSensors" icon={<MinusOutlined />} onClick={onClickHandler}>
                Detach Sensors
              </Menu.Item> */}

            </SubMenu>

            <SubMenu key="/sub2" icon={<DeploymentUnitOutlined />} title="Assets" onClick={onClickHandler}>
              <Menu.Item key="/trackAssets" icon={<MonitorOutlined />} onClick={onClickHandler}>
                View Assets Data
              </Menu.Item>
              {/* <Menu.Item key="/addAssetForm" icon={<PlusCircleOutlined />}
              onClick={onClickHandler}>
                Add new Asset
              </Menu.Item> */}

              {/* <Menu.Item key="/updateAsset" icon={<ExclamationCircleOutlined />}
              onClick={onClickHandler}>
                Update Assets
              </Menu.Item> */}

              {/* <Menu.Item key="/detachSensors" icon={<MinusOutlined />} onClick={onClickHandler}>
                Detach Sensors
              </Menu.Item> */}

            </SubMenu>
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
              <Route path="/addSensorForm" element={<AddSensorForm />} />
              <Route path="/viewSensors" element={<ViewSensor />} />
              <Route path="/activeSensors" element={<ActiveSensors />} />
              <Route path="/inactiveSensors" element={<InactiveSensors />} />
              <Route path="/attachSensors" element={<AssignSensors />} />
              <Route path="/addAssetForm" element={<AddAssetForm />} />
              {/* <Route path="/detachSensors" element={<RemoveSensors />} /> */}
              <Route path="/trackAssets" element={<TrackAssets />} />
              <Route path="/showMap" element={<ViewMap />} />
              {/* <Route path="/view/edit/:id" element={<EditBle />} />
      <Route path="/canvas" element={<Canvas />} /> */}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    	) : (<LoginForm setLoginFunc={setIsLoggedin} />)}
    	 {/* {!isLoggedin && <LoginForm setLoginFunc={setIsLoggedin} />} */}
    <Footer theme="dark">
      Systems Ltd
      {/* <div><a href="https://www.systemsltd.com/">About Us</a></div> */}
    </Footer>
  </Layout>
	);
}
export default Home;
