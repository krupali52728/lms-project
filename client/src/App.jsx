import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Student/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './components/student/Login.jsx';
import Signup from './components/student/Signup.jsx';
import Search from './components/student/Search.jsx';
import CourseDetails from './components/course/CourseDetails.jsx';
import StudentAccount from './components/Student/StudentAccount.jsx';
import StudentDashboard from './components/Student/StudentDashboard.jsx';
import EducatorDashboard from './components/Educator/EducatorDashboard.jsx';


import './index.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <div className="bg-slate-950 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<Search />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/student/account" element={<StudentAccount />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/educator/dashboard" element={<EducatorDashboard />} />
          </Routes>
        </div>
        
        
      </div>
    </AuthProvider>
  );
}

export default App;