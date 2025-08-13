import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home.jsx'
import Login from './components/Student/Login.jsx'
import SignUp from './components/Student/SignUp.jsx'
import './App.css'
import './index.css'

function App() {
  return (
    <AuthProvider>
      <div className="bg-slate-950 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App