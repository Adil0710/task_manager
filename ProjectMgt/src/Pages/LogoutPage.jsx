import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import authStore from "../stores/authstore"

function LogoutPage() {
    const store = authStore()

    useEffect(() => {
        store.logout()
    }, [store])
  // Redirect to /login after logout
  return <Navigate to="/login" />;
}

export default LogoutPage