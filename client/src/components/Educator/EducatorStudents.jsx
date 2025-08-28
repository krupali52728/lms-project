import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Search,
  Filter,
  Users,
  BookOpen,
  Star,
  Calendar,
  Mail,
  MessageCircle,
  Award,
  TrendingUp,
  Clock,
  Eye,
  MoreVertical,
  Download,
  RefreshCw,
  UserPlus,
  Target,
  GraduationCap
} from 'lucide-react';
 import {getAllStudentsAndEducators} from '../../Api/userApi.js'
const EducatorStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Placeholder data - replace with your backend data
  const [students, setStudents] = useState([
    // Empty array for now - you'll populate this with your backend API
  ]);

  

 

  const [courses, setCourses] = useState([
    
  ]);
 
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await getAllStudentsAndEducators();
        console.log('getAllStudentsAndEducators response:', res);
        
      } catch (error) {
        console.error('Failed to fetch students courses:', error);
      }
    };

    fetchAll();
  }, []);

  const studentStats = {
    totalStudents: students.length,
    activeStudents: students.filter(s => s.status === 'active').length,
    completedCourses: students.filter(s => s.progress === 100).length,
    avgProgress: students.length > 0 ? students.reduce((sum, s) => sum + s.progress, 0) / students.length : 0
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === 'all' || student.courseId === filterCourse;
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const EmptyState = () => (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="text-center py-16"
    >
      <Users className="w-20 h-20 text-slate-600 mx-auto mb-6" />
      <h3 className="text-2xl font-bold text-white mb-4">No students yet</h3>
      <p className="text-slate-400 mb-8 max-w-md mx-auto">
        Once students start enrolling in your courses, you'll be able to track their progress and interact with them here.
      </p>
      <Link
        to="/educator/add-course"
        className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
      >
        <BookOpen className="w-5 h-5" />
        <span>Create Your First Course</span>
      </Link>
    </motion.div>
  );

  const StudentCard = ({ student }) => (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {student.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="text-white font-semibold">{student.name}</h3>
            <p className="text-slate-400 text-sm">{student.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs ${
            student.status === 'active' 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : student.status === 'inactive'
              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {student.status}
          </span>
          <button className="p-1 hover:bg-slate-700 rounded-lg transition-colors">
            <MoreVertical className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Course Info */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Course:</span>
          <span className="text-white">{student.courseName}</span>
        </div>

        {/* Progress */}
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-400">Progress</span>
            <span className="text-white font-medium">{student.progress}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
              style={{ width: `${student.progress}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700">
          <div className="text-center">
            <p className="text-white font-bold text-lg">{student.lessonsCompleted}</p>
            <p className="text-slate-400 text-xs">Lessons</p>
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-lg">{student.timeSpent}h</p>
            <p className="text-slate-400 text-xs">Time Spent</p>
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-lg">{student.rating}</p>
            <p className="text-slate-400 text-xs">Rating</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-4">
          <button className="flex-1 px-3 py-2 bg-slate-700 text-slate-300 font-medium rounded-lg hover:bg-slate-600 hover:text-white transition-all duration-200 flex items-center justify-center space-x-2 text-sm">
            <Eye className="w-4 h-4" />
            <span>View</span>
          </button>
          <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 text-sm">
            <MessageCircle className="w-4 h-4" />
            <span>Message</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24">
      <div className="container mx-auto px-6 lg:px-8 pb-16">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <Link
              to="/educator/dashboard"
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-6 h-6 text-slate-400" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Student Management
              </h1>
              <p className="text-slate-300 mt-2">
                Track student progress and engagement
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="p-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-400 hover:text-white hover:border-slate-500 transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
            
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">{studentStats.totalStudents}</h3>
                <p className="text-slate-400 text-sm">Total Students</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">{studentStats.activeStudents}</h3>
                <p className="text-slate-400 text-sm">Active Students</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">{studentStats.completedCourses}</h3>
                <p className="text-slate-400 text-sm">Completed</p>
              </div>
              <Award className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">{Math.round(studentStats.avgProgress)}%</h3>
                <p className="text-slate-400 text-sm">Avg Progress</p>
              </div>
              <Target className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full sm:w-64"
                />
              </div>

              {/* Course Filter */}
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="completed">Completed</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="recent">Most Recent</option>
                <option value="progress">Highest Progress</option>
                <option value="time">Most Time Spent</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-slate-400 text-sm">
                {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Students Grid */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
        >
          {students.length === 0 ? (
            <EmptyState />
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No students found</h3>
              <p className="text-slate-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          )}
        </motion.div>

        {/* Engagement Insights - Show when students exist */}
        {students.length > 0 && (
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-6">Engagement Insights</h3>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Student Activity */}
                <div className="bg-slate-900/30 border border-slate-700 rounded-xl p-6">
                  <h4 className="text-white font-medium mb-4">Student Activity Trends</h4>
                  <div className="h-48 flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">Activity chart will appear here</p>
                    </div>
                  </div>
                </div>

                {/* Progress Distribution */}
                <div className="bg-slate-900/30 border border-slate-700 rounded-xl p-6">
                  <h4 className="text-white font-medium mb-4">Progress Distribution</h4>
                  <div className="h-48 flex items-center justify-center">
                    <div className="text-center">
                      <GraduationCap className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">Progress distribution chart</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        {students.length > 0 && (
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="flex items-center space-x-3 p-4 bg-slate-900/30 border border-slate-700 rounded-xl hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 group">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-300 group-hover:text-white transition-colors">Send Newsletter</span>
                </button>
                
                <button className="flex items-center space-x-3 p-4 bg-slate-900/30 border border-slate-700 rounded-xl hover:border-green-500/50 hover:bg-green-500/5 transition-all duration-300 group">
                  <Award className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300 group-hover:text-white transition-colors">Award Certificates</span>
                </button>
                
                <button className="flex items-center space-x-3 p-4 bg-slate-900/30 border border-slate-700 rounded-xl hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 group">
                  <MessageCircle className="w-5 h-5 text-purple-400" />
                  <span className="text-slate-300 group-hover:text-white transition-colors">Bulk Message</span>
                </button>
                
                <Link
                  to="/educator/analytics"
                  className="flex items-center space-x-3 p-4 bg-slate-900/30 border border-slate-700 rounded-xl hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all duration-300 group"
                >
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                  <span className="text-slate-300 group-hover:text-white transition-colors">View Analytics</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EducatorStudents;