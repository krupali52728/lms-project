import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  BookOpen, 
  Users, 
  DollarSign,
  TrendingUp,
  Edit,
  Eye,
  Trash2,
  Star,
  Clock,
  BarChart3,
  Calendar,
  Settings,
  Upload,
  Save,
  X,
  FileText,
  Video,
  Image as ImageIcon,
  Search,
  Filter
} from 'lucide-react';

const EducatorDashboard = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    difficulty: 'beginner',
    duration: '',
    thumbnail: null,
    tags: []
  });

  // Placeholder data - in a real app, this would come from your API
  const stats = [
    { label: 'Total Courses', value: '24', icon: BookOpen, color: 'blue', change: '+12%' },
    { label: 'Total Students', value: '1,542', icon: Users, color: 'green', change: '+23%' },
    { label: 'Total Revenue', value: '$18,420', icon: DollarSign, color: 'purple', change: '+15%' },
    { label: 'Avg Rating', value: '4.8', icon: Star, color: 'yellow', change: '+0.2' }
  ];

  const courses = [
    {
      id: 1,
      title: 'Complete React Developer Course',
      description: 'Learn React from scratch with practical projects and real-world examples.',
      thumbnail: '/api/placeholder/300/200',
      price: 89.99,
      students: 342,
      rating: 4.8,
      reviews: 128,
      category: 'Web Development',
      difficulty: 'Intermediate',
      duration: '12h 30m',
      status: 'published',
      created: '2023-12-01',
      lastUpdated: '2024-01-15',
      lessons: 45,
      completionRate: 78
    },
    
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const handleCourseFormChange = (e) => {
    const { name, value } = e.target;
    setCourseForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateCourse = () => {
    // Here you would typically save to your server
    console.log('Creating course:', courseForm);
    setIsCreatingCourse(false);
    setCourseForm({
      title: '',
      description: '',
      category: '',
      price: '',
      difficulty: 'beginner',
      duration: '',
      thumbnail: null,
      tags: []
    });
  };

  const handleCancelCreate = () => {
    setIsCreatingCourse(false);
    setCourseForm({
      title: '',
      description: '',
      category: '',
      price: '',
      difficulty: 'beginner',
      duration: '',
      thumbnail: null,
      tags: []
    });
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24">
      <div className="container mx-auto px-6 lg:px-8 pb-16">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-12"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Educator Dashboard
            </h1>
            <p className="text-xl text-slate-300">
              Manage your courses and track your teaching performance
            </p>
          </div>
          
          <div className="mt-6 md:mt-0">
            <button
              onClick={() => setIsCreatingCourse(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Course</span>
            </button>
          </div>
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
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                    <p className="text-slate-400 text-sm">{stat.label}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Tabs */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="border-b border-slate-700">
            <nav className="flex space-x-8">
              {[
                { id: 'courses', label: 'My Courses', icon: BookOpen },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                { id: 'students', label: 'Students', icon: Users }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-400'
                        : 'border-transparent text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'courses' && (
            <div className="space-y-8">
              {/* Course Search and Filters */}
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <h2 className="text-2xl font-bold text-white">My Courses ({courses.length})</h2>
                  
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Courses Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden hover:border-slate-600/50 transition-all duration-300 group"
                  >
                    {/* Course Thumbnail */}
                    <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600">
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 backdrop-blur-sm rounded-full text-white text-sm ${
                          course.status === 'published' 
                            ? 'bg-green-500/20 border border-green-500/30' 
                            : 'bg-yellow-500/20 border border-yellow-500/30'
                        }`}>
                          {course.status}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center space-x-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                          <Star className="w-3 h-3 fill-current text-yellow-400" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-200">
                        {course.title}
                      </h3>
                      
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2">{course.description}</p>

                      {/* Course Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-slate-400">Students:</span>
                          <span className="text-white ml-2 font-medium">{course.students}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Price:</span>
                          <span className="text-white ml-2 font-medium">${course.price}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Lessons:</span>
                          <span className="text-white ml-2 font-medium">{course.lessons}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Duration:</span>
                          <span className="text-white ml-2 font-medium">{course.duration}</span>
                        </div>
                      </div>

                      {/* Completion Rate */}
                      {course.status === 'published' && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-slate-300">Completion Rate</span>
                            <span className="text-white font-medium">{course.completionRate}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
                              style={{ width: `${course.completionRate}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex space-x-2 pt-4 border-t border-slate-700">
                        <button className="flex-1 px-4 py-2 bg-slate-700 text-slate-300 font-medium rounded-lg hover:bg-slate-600 hover:text-white transition-all duration-200 flex items-center justify-center space-x-2">
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2">
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Analytics Dashboard</h2>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Revenue Chart */}
                  <div className="bg-slate-900/30 border border-slate-700 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Revenue Overview</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400">Revenue chart would go here</p>
                      </div>
                    </div>
                  </div>

                  {/* Student Enrollment */}
                  <div className="bg-slate-900/30 border border-slate-700 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Student Enrollment</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400">Enrollment chart would go here</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Performing Courses */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-white mb-6">Top Performing Courses</h3>
                  <div className="space-y-4">
                    {courses.slice(0, 3).map((course, index) => (
                      <div key={course.id} className="bg-slate-900/30 border border-slate-700 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">{course.title}</h4>
                            <p className="text-slate-400 text-sm">{course.students} students • ${course.price}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-bold text-lg">${(course.students * course.price).toLocaleString()}</div>
                            <p className="text-slate-400 text-sm">Total Revenue</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="space-y-8">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Student Management</h2>
                
                <div className="text-center py-16">
                  <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">Student management features coming soon</p>
                  <p className="text-slate-500">View and interact with your students</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Create Course Modal */}
        {isCreatingCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-800 border border-slate-700 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Create New Course</h2>
                <button
                  onClick={handleCancelCreate}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <form className="space-y-6">
                {/* Course Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={courseForm.title}
                    onChange={handleCourseFormChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Enter course title"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={courseForm.description}
                    onChange={handleCourseFormChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                    placeholder="Describe your course..."
                    required
                  />
                </div>

                {/* Category and Difficulty */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={courseForm.category}
                      onChange={handleCourseFormChange}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Programming">Programming</option>
                      <option value="Design">Design</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Difficulty Level
                    </label>
                    <select
                      name="difficulty"
                      value={courseForm.difficulty}
                      onChange={handleCourseFormChange}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                {/* Price and Duration */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={courseForm.price}
                      onChange={handleCourseFormChange}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Estimated Duration
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={courseForm.duration}
                      onChange={handleCourseFormChange}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="e.g., 5h 30m"
                    />
                  </div>
                </div>

                {/* Thumbnail Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Course Thumbnail
                  </label>
                  <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center hover:border-slate-500 transition-colors duration-200">
                    <ImageIcon className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400 mb-2">Drop your thumbnail here, or click to browse</p>
                    <p className="text-slate-500 text-sm">PNG, JPG up to 10MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setCourseForm(prev => ({ ...prev, thumbnail: e.target.files[0] }))}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={handleCancelCreate}
                    className="flex-1 px-6 py-3 border border-slate-600 text-slate-300 font-medium rounded-xl hover:border-slate-500 hover:text-white transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateCourse}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    Create Course
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EducatorDashboard;
