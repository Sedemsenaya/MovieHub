import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
    ShoppingCartOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import './Layout.css'
import Search from "./Search";
import Avatar from "./Avatar";
import Toggler from "./Toggler";
import Dash from "./Dash";

const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className={'layout-container'} style={{
        height:'1vh'
    }}>
      <Sider trigger={null} collapsible collapsed={collapsed}
      style={{
          height: '800vh'
      }}
             className={'layout-content'}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <VideoCameraOutlined />,
              label: 'movies',
            },
            {
              key: '2',
              icon:<ShoppingCartOutlined style={{fontSize:'21px' }}/>,
              label: 'cart',
            }
          ]}
        />
      </Sider>
      <Layout>
          <Header
              style={{
                  padding: 0,
                  background: colorBgContainer,
              }}
          >


                  <div className="row">
                      <div className="col-xs-1 col-sm-1 col-md-1 col-xl-1 col-xxl-1 col-1 ">
                          <Button
                              type="text"
                              icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                              onClick={() => setCollapsed(!collapsed)}
                              style={{
                                  fontSize: '16px',
                                  width: 64,
                                  height: 64,
                              }}
                          />
                      </div>
                      <div className="col-2 col-xs-1 ">
                          <Search/>
                      </div>
                      <div className="col">
                          <div class="container text-center">
                              <div class="row">
                                <div class="col">

                                </div>
                                  <div class="col">
                                  </div>
                                  <div class="col">
                                      <Avatar/>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>


          </Header>
          <Content className={'layout-content'}
                   style={{
                       margin: '24px 16px',
                       padding: 24,
                       // minHeight: '100vh',
                       background: colorBgContainer,
                       borderRadius: borderRadiusLG,
                   }}
          >
              <Dash/>
          </Content>
      </Layout>
    </Layout>
  );
};
export default App;