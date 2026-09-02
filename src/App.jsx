// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Header from './Components/Header/Header'
// import Home from './Pages/Home'
// import Login from './Components/Auth/Login'
// import Signup from './Components/Auth/Signup'
// import ProtectedRoute from './Components/ProtectedRoute'
// import './App.css'

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="app">
//         <Routes>

//           <Route path="/" element={<><Header /><Home /></>} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />


//           <Route path="/dashboard" element={
//             <ProtectedRoute>
//               <div style={{
//                 minHeight: '100vh',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 color: 'white',
//                 flexDirection: 'column',
//                 gap: '1rem',
//                 background: 'var(--dark)',
//                 fontFamily: 'Inter,sans-serif'
//               }}>
//                 <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
//                   🎉 Welcome to Dashboard!
//                 </h2>
//                 <p style={{ color: 'var(--text-secondary)' }}>
//                   Day 3 madhe full dashboard banvuya!
//                 </p>
//               </div>
//             </ProtectedRoute>
//           } />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   )
// }

// export default App

// import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import Header from "./components/header/Header";
// import Login from "./components/Auth/login";
// import Signup from "./components/Auth/signup";
// import ProtectedRoute from "./components/UI/ProtectedRoute";


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Home from './Pages/Home'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
// import login from './components/Auth/login'
// import signup from './components/Auth/signup'
import Dashboard from './Pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<><Header /><Home /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App