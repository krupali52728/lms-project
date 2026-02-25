
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
//import Navbar from './components/Student/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './components/Student/Login.jsx';
import Signup from './components/Student/Signup.jsx';
import ForgotPassword from './components/Student/ForgotPassword.jsx';
import ForgotPasswordOTP from './components/Student/ForgotPasswordOTP.jsx';
import ResetPassword from './components/Student/ResetPassword.jsx';
import OTPVerification from './components/Student/OTPVerification.jsx';
import Search from './components/Student/Search.jsx';
import CourseDetails from './components/course/CourseDetails.jsx';
import CourseLearn from './components/course/CourseLearn.jsx';
import StudentAccount from './components/Student/StudentAccount.jsx';
import StudentDashboard from './components/Student/StudentDashboard.jsx';
import EducatorDashboard from './components/Educator/EducatorDashboard.jsx';
import EducatorLayout from './components/layouts/EducatorLayout.jsx';
import StudentLayout from './components/layouts/StudentLayout.jsx';
import EducatorAddCourse from './components/Educator/EducatorAddCourse.jsx';
import EducatorAllCourse from './components/Educator/EducatorAllCourse.jsx';
import EducatorEditAndDeleteCourse from './components/Educator/EducatorEditAndDeleteCourse.jsx';
import EducatorAnalytics from './components/Educator/EducatorAnalytics.jsx';
import EducatorStudents from './components/Educator/EducatorStudents.jsx';
import AttendanceReport from './components/attendance/AttendanceReport.jsx';
import ViewAttendance from "./components/Student/ViewAttendance";
import MainLayout from './components/layouts/MainLayout';
import NotFound from './pages/NotFound.jsx';
import './index.css';
import AllCourse from './components/course/AllCourse.jsx';
import About from './components/Student/About.jsx';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#fff',
              border: '1px solid #334155',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <Routes>

  {/* No Navbar */}
  <Route path="/course/:id/learn" element={<CourseLearn />} />

  {/* Navbar + main layout */}
  <Route element={<MainLayout />}>

    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/forgot-password/verify-otp" element={<ForgotPasswordOTP />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/verify-otp" element={<OTPVerification />} />
    <Route path="/about" element={<About />} />
    <Route path="/search" element={<Search />} />
    <Route path="/course" element={<AllCourse />} />
    <Route path="/course/:id" element={<CourseDetails />} />

    {/* Student */}
   {/* Student */}
<Route path="/student" element={<StudentLayout />}>
  <Route path="dashboard" element={<StudentDashboard />} />
  <Route path="attendance" element={<ViewAttendance />} />
  <Route path="account" element={<StudentAccount />} />
</Route>
    {/* Educator */}
    <Route path="/educator" element={<EducatorLayout />}>
      <Route index element={<EducatorDashboard />} />
      <Route path="dashboard" element={<EducatorDashboard />} />
      <Route path="add-course" element={<EducatorAddCourse />} />
      <Route path="all-courses" element={<EducatorAllCourse />} />
      <Route path="edit-course/:id" element={<EducatorEditAndDeleteCourse />} />
      <Route path="analytics" element={<EducatorAnalytics />} />
      <Route path="students" element={<EducatorStudents />} />
    </Route>

    <Route path="*" element={<NotFound />} />

  </Route>
</Routes>

      </div>
    </AuthProvider>
  );
}

export default App;