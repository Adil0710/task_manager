import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, ConfigProvider, Layout, Menu, theme } from 'antd';
import YourComponent from './component/YourComponent'
import Loginform from './component/Loginform'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardPage from './Pages/DashboardPage'
import LogoutPage from './Pages/LogoutPage'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import ThemeToggle from './component/ThemeToggle'
import { useTheme } from './context/ThemeProvider'
import authStore from './stores/authstore';
import RequireAuth from './component/RequireAuth';

function App() {

  const store = authStore()

  const { Header, Sider, Content } = Layout;

  const {isDarkMode} = useTheme()

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div className={`${isDarkMode ? "dark" : ""} bg-[#f3f4f6] dark:bg-[#0b0b0b] min-h-screen w-full`}>
        <ConfigProvider
            theme={{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                token: {
                  // Seed Token
                  colorPrimary: '#6F56EC',
                },
            }}
        >
          {/* <Layout>
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
              
            </Content>
          </Layout>
        </Layout> */}

        <BrowserRouter>
          <Routes>
          <Route index element={<HomePage /> } />
          <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </BrowserRouter>

        </ConfigProvider>
    
{/* 
    <ThemeToggle/> */}
    
    </div>
  )
}

export default App
