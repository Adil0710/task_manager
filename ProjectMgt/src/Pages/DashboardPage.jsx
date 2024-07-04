import React, { useEffect, useState } from 'react';
import { FaCloudBolt } from "react-icons/fa6";
import Dashboard from '../component/Dashboard';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BellOutlined,
  LogoutOutlined,
  LockOutlined
} from '@ant-design/icons';
import { Button, ConfigProvider, Divider, Layout, Menu, theme, Avatar, Tooltip, Dropdown } from 'antd';
import { useTheme } from '../context/ThemeProvider';
import ThemeToggle from '../component/ThemeToggle';
import authStore from '../stores/authstore';
import { getInitials } from '../utils/utils';
import { Link } from 'react-router-dom';


const items = [
  {
    label: 'Edit Profile',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: 'Change password',
    key: '2',
    icon: <LockOutlined />,
  },
  {
    label: <Link to='/logout'>Logout</Link>,
    key: '3',
    icon: <LogoutOutlined />,
    danger: true,
  },
];
const menuProps = {
  items,
};

function DashboardPage() {
  const { Header, Sider, Content } = Layout;
  const { isDarkMode } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const store = authStore()

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, [store]);

  const initials = getInitials(userData);

  return (
    <div>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <Layout>
          <Sider
            className='relative'
            style={{
              background: `${isDarkMode ? '#141414' : colorBgContainer}`,
              minHeight: '100vh',
              overflow: 'hidden',
            }}
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            <div className="demo-logo-vertical flex items-center justify-center" style={{height: 64}}>
            <FaCloudBolt className="text-[#6F56EC] text-[40px]" />
            </div>
            <Menu mode="inline" defaultSelectedKeys={['1']} className="menu h-full">
              <Menu.Item key="1" icon={<UserOutlined />}>
                nav 1
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                nav 2
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                nav 3
              </Menu.Item>
              <div className="menu-bottom absolute w-full bottom-5 px-2">
                <Divider />
                  <Tooltip title="adil">
                  <ThemeToggle />
                  </Tooltip>
                
              </div>
            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: `${isDarkMode ? '#141414' : colorBgContainer}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
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
              <div className=' flex items-center justify-center gap-5 pr-5'>
                <BellOutlined style={{
                  fontSize: '22px',
                }}/>
                <Dropdown menu={menuProps}><Avatar style={{ backgroundColor: '#6F56EC'}} size="large">{initials}</Avatar></Dropdown>
              </div>
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Dashboard />
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
}

export default DashboardPage;
