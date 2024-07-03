import React, { useState } from 'react'
import Dashboard from '../component/Dashboard'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, ConfigProvider, Layout, Menu, theme } from 'antd';
import { useTheme } from '../context/ThemeProvider';

function DashboardPage() {


  const { Header, Sider, Content } = Layout;

  const {isDarkMode} = useTheme()

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div>
       <ConfigProvider
            theme={{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
          <Layout>
            <Sider style={{background: `${isDarkMode ? "#141414" : colorBgContainer}`, height: "100vh"}} trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical">Task Manager</div>
            <Menu
              
              mode="inline"
              defaultSelectedKeys={['1']}
              items={[
                {
                  key: '1',
                  icon: <UserOutlined />,
                  label: 'nav 1',
                },
                {
                  key: '2',
                  icon: <VideoCameraOutlined />,
                  label: 'nav 2',
                },
                {
                  key: '3',
                  icon: <UploadOutlined />,
                  label: 'nav 3',
                },
              ]}
            />
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: `${isDarkMode ? "#141414" : colorBgContainer}` }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Dashboard/>
            </Content>
          </Layout>
        </Layout>

        </ConfigProvider>
      
      
      </div>
  )
}

export default DashboardPage