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

const {
	Content, Sider,
} = Layout;
//	Content, Footer

const { SubMenu } = Menu;

function Home() {
	const [collapsed, setCollapsed] = useState(false);
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

  <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapseHandler}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

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
          Track Assets
        </Menu.Item>

        <Menu.Item key="/showmap" icon={<EnvironmentOutlined />} onClick={onClickHandler}>
          Map
        </Menu.Item>

      </Menu>
    </Sider>
    <Layout className="site-layout">
      <Content style={{ margin: '0 16px' }}>
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
    </Layout>
    {/* <Layout className="site-layout">
      <Content style={{ margin: '0 16px' }}>

        {visibleComp === '1' ? <ActiveSensors />
        	: visibleComp === '2' ? <InactiveSensors />
          		: visibleComp === '3' ? <AssignSensors />
          			: visibleComp === '4' ? <RemoveSensors />
          				: visibleComp === '5' ? <AddSensors />
          					: visibleComp === '6' ? <TrackAssets />
          						: visibleComp === '7' ? <ShowMap />
        							: visibleComp === 'sub1' ? <Dashboard /> : <div />}
      </Content>
      <Footer style={{ textAlign: 'center' }} />
    </Layout> */}
  </Layout>
	);
}
export default Home;
