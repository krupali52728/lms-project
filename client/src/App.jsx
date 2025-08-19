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
import EducatorLayout from './components/layouts/EducatorLayout.jsx';
import StudentLayout from './components/layouts/StudentLayout.jsx';


import './index.css';
import EducatorAddCourse from './components/Educator/EducatorAddCourse.jsx';
import EducatorAllCourse from './components/Educator/EducatorAllCourse.jsx';
import EducatorEditAndDeleteCourse from './components/Educator/EducatorEditAndDeleteCourse.jsx';
import EducatorAnalytics from './components/Educator/EducatorAnalytics.jsx';
import EducatorStudents from './components/Educator/EducatorStudents.jsx';

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
            
            {/* Student Routes - Protected by StudentLayout */}
            <Route path="/student" element={<StudentLayout />}>
              <Route path="account" element={<StudentAccount />} />
              <Route path="dashboard" element={<StudentDashboard />} />
            </Route>

            {/* Educator Routes - Protected by EducatorLayout */}
            <Route path="/educator" element={<EducatorLayout />}>
              <Route index element={<EducatorDashboard />} />
              <Route path="dashboard" element={<EducatorDashboard />} />
              <Route path="create-course" element={<EducatorAddCourse />} />
              <Route path="all-courses" element={<EducatorAllCourse />} />
              <Route path="edit-course/:id" element={<EducatorEditAndDeleteCourse />} />
              <Route path="analytics" element={<EducatorAnalytics />} />
              <Route path="students" element={<EducatorStudents />} />
            </Route>
          </Routes>
        </div>
        
        
      </div>
    </AuthProvider>
  );
}

export default App;