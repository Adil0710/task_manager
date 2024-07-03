import React, { useState } from 'react'
import authStore from "../stores/authstore"
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Grid, Input, Typography, theme, ConfigProvider } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useTheme } from '../context/ThemeProvider';


function Loginform() {
    const store = authStore()
    const navigate = useNavigate()
    const {isDarkMode} = useTheme()
    const [loading, setLoading] = useState(false); // State for loading

    
    const handleLogin = async (e) => {
      setLoading(true)
        const success = await store.login();
        setLoading(false)
        if (success) {
          console.log('Logged in successfully');
          // Redirect or show success message
          navigate('/dashboard')
        } else {
          console.log('Login failed');
          // Show error message to the user
        }
      };
    const handleChange = (e) => {
        store.updateLoginForm(e)
    }
  return (
    <ConfigProvider
            theme={{
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row dark:bg-[#0b0b0b] bg-[#f3f4f6]'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        {/* left side */}
        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
            <span className='flex gap-1 py-1 px-3 border dark:border-[#292929] dark:text-white dark:text-opacity-80 rounded-full text-sm md:text-base border-gray-300 text-gray-600'>
              Manage all your task in one place!
            </span>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center dark:text-blue-600 text-blue-700'>
              <span>Cloud-Based</span>
              <span>Task Manager</span>
            </p>

            <div className='cell'>
              <div className='circle rotate-in-up-left'></div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <div
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white dark:bg-[#141414] px-10 pt-14 pb-14'
          >
            <div className=''>
              <p className='text-blue-600 dark:text-blue-500 text-3xl font-bold text-center'>
                Welcome back!
              </p>
              <p className='text-center text-base text-gray-700 dark:text-white dark:text-opacity-90 '>
                Keep all your credential safe.
              </p>
            </div>

            <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="email"
            rules={[{ type: 'email', required: true, message: 'Please input your Email!' }]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              onChange={handleChange} // Handle change using store method
              value={store.loginForm.email} // Bind value directly from store
              name="email" // Ensure name attribute matches field name
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              onChange={handleChange} // Handle change using store method
              value={store.loginForm.password} // Bind value directly from store
              name="password" // Ensure name attribute matches field name
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            {/* <a style={styles.forgotPassword} href="">
              Forgot password?
            </a> */}
          </Form.Item>
          <Form.Item style={{ marginBottom: '0px' }}>
            <Button block type="primary" htmlType="submit" loading={loading}>
              Log in
            </Button>
            
          </Form.Item>
        </Form>
          </div>
        </div>
      </div>
    </div>
    </ConfigProvider>
  )
}

export default Loginform