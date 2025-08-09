import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import './App.css'
import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Home />} /> {/* Replace with actual Courses component when available */}
        <Route path="/register" element={<Home />} /> {/* Replace with actual Register component when available */}
      </Routes>
    </div>
  )
}

export default App