import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import Loginform from '../component/Loginform';
import authStore from '../stores/authstore';

function LoginPage() {
  const store = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (store.loggedIn === null) {
      store.checkAuth();
    }
  }, [store]);

  useEffect(() => {
    if (store.loggedIn) {
      navigate('/dashboard');
    }
  }, [store.loggedIn, navigate]);

  if (store.loggedIn === null) {
    return <div className='min-h-screen dark:bg-[#0b0b0b] w-full flex items-center justify-center'><Spin size="large" /></div>;
  }

  return (
    <div>
      <Loginform />
    </div>
  );
}

export default LoginPage;
