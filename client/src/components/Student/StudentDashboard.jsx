import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp,
  Play,
  CheckCircle,
  Calendar,
  Target,
  Star,
  BarChart3,
  Filter,
  Search,
  Grid,
  List
} from 'lucide-react';

const StudentDashboard = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Placeholder data - in a real app, this would come from your API
  const stats = [
    { label: 'Enrolled Courses', value: '8', icon: BookOpen, color: 'blue' },
    { label: 'Completed Courses', value: '12', icon: CheckCircle, color: 'green' },
    { label: 'Total Study Hours', value: '124', icon: Clock, color: 'purple' },
    { label: 'Certificates Earned', value: '5', icon: Award, color: 'yellow' }
  ];

  const enrolledCourses = [
    {
      id: 1,
      title: 'Complete React Developer Course',
      instructor: 'John Smith',
      thumbnail: '/api/placeholder/300/200',
      progress: 75,
      totalLessons: 45,
      completedLessons: 34,
      duration: '12h 30m',
      rating: 4.8,
      lastAccessed: '2 hours ago',
      category: 'Web Development',
      difficulty: 'Intermediate',
      nextLesson: 'React Hooks - Advanced Patterns'
    },
    {
      id: 2,
      title: 'Advanced JavaScript Concepts',
      instructor: 'Sarah Johnson',
      thumbnail: '/api/placeholder/300/200',
      progress: 45,
      totalLessons: 32,
      completedLessons: 14,
      duration: '8h 45m',
      rating: 4.9,
      lastAccessed: '1 day ago',
      category: 'Programming',
      difficulty: 'Advanced',
      nextLesson: 'Closures and Scope'
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Mike Chen',
      thumbnail: '/api/placeholder/300/200',
      progress: 90,
      totalLessons: 28,
      completedLessons: 25,
      duration: '6h 15m',
      rating: 4.7,
      lastAccessed: '3 hours ago',
      category: 'Design',
      difficulty: 'Beginner',
      nextLesson: 'Design System Creation'
    },
    {
      id: 4,
      title: 'Python for Data Science',
      instructor: 'Dr. Lisa Wang',
      thumbnail: '/api/placeholder/300/200',
      progress: 20,
      totalLessons: 52,
      completedLessons: 10,
      duration: '15h 20m',
      rating: 4.6,
      lastAccessed: '5 days ago',
      category: 'Data Science',
      difficulty: 'Intermediate',
      nextLesson: 'Pandas DataFrames'
    }
  ];

  const upcomingDeadlines = [
    {
      course: 'Complete React Developer Course',
      assignment: 'Build a Todo App',
      dueDate: '2024-01-25',
      timeLeft: '3 days'
    },
    {
      course: 'UI/UX Design Fundamentals',
      assignment: 'Design Portfolio Review',
      dueDate: '2024-01-28',
      timeLeft: '6 days'
    },
    {
      course: 'Advanced JavaScript Concepts',
      assignment: 'Final Project',
      dueDate: '2024-02-01',
      timeLeft: '10 days'
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'from-green-500 to-emerald-600';
    if (progress >= 50) return 'from-blue-500 to-blue-600';
    if (progress >= 25) return 'from-yellow-500 to-orange-600';
    return 'from-slate-500 to-slate-600';
  };

  const filteredCourses = enrolledCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'in-progress') return matchesSearch && course.progress > 0 && course.progress < 100;
    if (filterStatus === 'completed') return matchesSearch && course.progress === 100;
    if (filterStatus === 'not-started') return matchesSearch && course.progress === 0;
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24">
      <div className="container mx-auto px-6 lg:px-8 pb-16">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Learning Dashboard
          </h1>
          <p className="text-xl text-slate-300">
            Track your progress and continue your learning journey
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const colorClasses = {
              blue: 'from-blue-500 to-blue-600',
              green: 'from-green-500 to-emerald-600',
              purple: 'from-purple-500 to-purple-600',
              yellow: 'from-yellow-500 to-orange-600'
            };

            return (
              <div
                key={stat.label}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[stat.color]} rounded-xl flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Filters and Search */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <h2 className="text-2xl font-bold text-white">My Courses</h2>
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full sm:w-auto"
                    />
                  </div>

                  {/* Filter */}
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="all">All Courses</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="not-started">Not Started</option>
                  </select>

                  {/* View Toggle */}
                  <div className="flex border border-slate-600 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'} transition-colors duration-200`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'} transition-colors duration-200`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Courses Grid/List */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.4 }}
              className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2' : 'grid-cols-1'}`}
            >
              {filteredCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden hover:border-slate-600/50 transition-all duration-300 group"
                >
                  {viewMode === 'grid' ? (
                    <>
                      {/* Course Thumbnail */}
                      <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600">
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                            {course.difficulty}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <div className="flex items-center space-x-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                            <Star className="w-3 h-3 fill-current text-yellow-400" />
                            <span>{course.rating}</span>
                          </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </button>
                        </div>
                      </div>

                      {/* Course Info */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-200">
                            {course.title}
                          </h3>
                        </div>
                        
                        <p className="text-slate-400 text-sm mb-4">by {course.instructor}</p>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-slate-300">Progress</span>
                            <span className="text-white font-medium">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(course.progress)} transition-all duration-300`}
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>

                        {/* Course Stats */}
                        <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                          <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                          <span>{course.duration}</span>
                        </div>

                        {/* Next Lesson */}
                        <div className="border-t border-slate-700 pt-4">
                          <p className="text-xs text-slate-400 mb-1">Next Lesson:</p>
                          <p className="text-sm text-white">{course.nextLesson}</p>
                        </div>

                        {/* Action Button */}
                        <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                          Continue Learning
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center space-x-6 p-6">
                      {/* Thumbnail */}
                      <div className="w-24 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex-shrink-0 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Course Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white mb-1 truncate group-hover:text-blue-400 transition-colors duration-200">
                          {course.title}
                        </h3>
                        <p className="text-slate-400 text-sm mb-2">by {course.instructor}</p>
                        
                        {/* Progress */}
                        <div className="flex items-center space-x-3">
                          <div className="flex-1 bg-slate-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(course.progress)}`}
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <span className="text-white text-sm font-medium min-w-[3rem]">{course.progress}%</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-3">
                        <span className="text-slate-400 text-sm">{course.completedLessons}/{course.totalLessons}</span>
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                          Continue
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Learning Goals */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.5 }}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Target className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Weekly Goal</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-300">Study Time</span>
                    <span className="text-white font-medium">12/15 hours</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600" style={{ width: '80%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-300">Lessons Completed</span>
                    <span className="text-white font-medium">8/10</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" style={{ width: '80%' }} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Upcoming Deadlines */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.6 }}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="w-6 h-6 text-orange-400" />
                <h3 className="text-xl font-semibold text-white">Upcoming Deadlines</h3>
              </div>
              
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="border-l-4 border-orange-400 pl-4 py-2">
                    <h4 className="text-white font-medium text-sm">{deadline.assignment}</h4>
                    <p className="text-slate-400 text-xs mb-1">{deadline.course}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-400 text-xs">{deadline.timeLeft} left</span>
                      <span className="text-slate-500 text-xs">{deadline.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Study Streak */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.7 }}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <TrendingUp className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-semibold text-white">Study Streak</h3>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">7</div>
                <p className="text-slate-300 text-sm">Days in a row</p>
                <p className="text-slate-500 text-xs mt-1">Keep it up!</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;