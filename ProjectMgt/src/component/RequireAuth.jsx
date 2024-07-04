import React, { useEffect } from 'react';
import authStore from '../stores/authstore';
import { Navigate } from 'react-router-dom';
import { Spin } from 'antd';

function RequireAuth({ children }) {
  const store = authStore();

  useEffect(() => {
    if (store.loggedIn === null) {
      store.checkAuth();
    }
  }, [store.loggedIn]);

  if (store.loggedIn === null) {
    return <div className='min-h-screen dark:bg-[#0b0b0b] w-full flex items-center justify-center'><Spin size="large" /></div>;
  }

  if (store.loggedIn === false) {
    return <Navigate to='/login' />;
  }

  return <div>{children}</div>;
}

export default RequireAuth;
