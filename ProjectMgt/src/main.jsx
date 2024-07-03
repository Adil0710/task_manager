import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'
import { ThemeProvider } from './context/ThemeProvider.jsx'

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(

  <ThemeProvider>
    <App />
    </ThemeProvider>
  
)
