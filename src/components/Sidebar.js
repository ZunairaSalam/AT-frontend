import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  AimOutlined,
  AlertOutlined,
  PlusOutlined,
  MinusOutlined,
  MonitorOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import './Home.css';
import ActiveSensors from './activeSensors';
import InactiveSensors from './inactiveSensors';
import RemoveSensors from './removeSensor';
import AssignSensors from './assignSensors';
import AddSensors from './addSensor';
import TrackAssets from './trackAssets';
import ShowMap from './showMap';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Sidebar(props){
    const [collapsed, setCollapsed] = useState(false);
    const [visibleComp, setvisibleComp] = useState("1");
    const onCollapseHandler = collapsed =>{
        console.log(collapsed);
        setCollapsed(collapsed);
    }

    const onClickHandler=e=>{
        console.log(e.key);
        setvisibleComp(e.key);
    }
    return(
        
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapseHandler}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            
           
            <SubMenu key="sub1" icon={<AlertOutlined />} title="Sensors">
                <Menu.Item key="1" icon={<CheckCircleOutlined />} onClick={onClickHandler}>
                    Active Sensors
                </Menu.Item>
                <Menu.Item key="2" icon={<ExclamationCircleOutlined /> } onClick={onClickHandler}>
                    InActive Sensors
                </Menu.Item>
                <Menu.Item key="3" icon={<AimOutlined />} onClick={onClickHandler}>
                    Assign Sensors
                </Menu.Item>
                <Menu.Item key="4" icon={<MinusOutlined />} onClick={onClickHandler}>
                    Remove Sensors
                </Menu.Item>
                <Menu.Item key="5" icon={<PlusOutlined />} onClick={onClickHandler}>
                    Add New Sensor
                </Menu.Item>
            </SubMenu>
            
            <Menu.Item key="6" icon={<MonitorOutlined />} onClick={onClickHandler}>
              Track Assets
            </Menu.Item>
            <Menu.Item key="7" icon={<EnvironmentOutlined />} onClick={onClickHandler}>
              Map
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
          <Content style={{ margin: '0 16px' }}>
          
            {visibleComp=="1" ? <ActiveSensors /> : 
                visibleComp=="2" ? <InactiveSensors />:
                    visibleComp=="3" ? <AssignSensors />:
                        visibleComp=="4" ? <RemoveSensors />:
                            visibleComp=="5" ? <AddSensors />:
                                visibleComp=="6" ? <TrackAssets />:
                                    visibleComp=="7" ? <ShowMap />:<div/>
                        }
          </Content>
          <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
      </Layout>
    );
}
export default Sidebar;