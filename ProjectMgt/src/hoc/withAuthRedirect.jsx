import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import authStore from '../stores/authstore';

const withAuthRedirect = (WrappedComponent) => {
  return (props) => {
    const store = authStore();

    useEffect(() => {
      if (store.loggedIn === null) {
        store.checkAuth();
      }
    }, [store]);

    if (store.loggedIn === null) {
      return <div className="min-h-screen dark:bg-[#0b0b0b] w-full flex items-center justify-center"><Spin size="large" /></div>;
    }

    if (store.loggedIn) {
      return <Navigate to="/dashboard" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthRedirect;
