import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { FitnessProvider } from './context/FitnessContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FitnessProvider>
      <App />
    </FitnessProvider>
  </React.StrictMode>,
)