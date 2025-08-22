import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  BookOpen,
  Star,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  Clock,
  Target,
  Award
} from 'lucide-react';

const EducatorAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Placeholder data - replace with your backend data
  const analyticsData = {
    overview: {
      totalRevenue: 0,
      totalStudents: 0,
      totalCourses: 0,
      avgRating: 0,
      revenueChange: 0,
      studentsChange: 0,
      coursesChange: 0,
      ratingChange: 0
    },
    chartData: [],
    topCourses: [],
    recentActivity: [],
    studentEngagement: {
      completionRate: 0,
      avgTimeSpent: 0,
      dropoffRate: 0,
      satisfactionScore: 0
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, color, prefix = '', suffix = '' }) => (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600/50 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm mb-2">{title}</p>
          <h3 className="text-2xl font-bold text-white mb-2">
            {prefix}{value}{suffix}
          </h3>
          <div className="flex items-center space-x-2">
            {change >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
            <span className={`text-sm font-medium ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change >= 0 ? '+' : ''}{change}%
            </span>
            <span className="text-slate-500 text-sm">vs last period</span>
          </div>
        </div>
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const EmptyAnalytics = () => (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="text-center py-16"
    >
      <BarChart3 className="w-20 h-20 text-slate-600 mx-auto mb-6" />
      <h3 className="text-2xl font-bold text-white mb-4">No analytics data yet</h3>
      <p className="text-slate-400 mb-8 max-w-md mx-auto">
        Start creating and publishing courses to see detailed analytics about your performance and revenue.
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
                Analytics Dashboard
              </h1>
              <p className="text-slate-300 mt-2">
                Track your teaching performance and revenue insights
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 3 months</option>
              <option value="1y">Last year</option>
            </select>
            
            <button className="p-2 bg-slate-800 border border-slate-600 rounded-lg text-slate-400 hover:text-white hover:border-slate-500 transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
            
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </motion.div>

        {analyticsData.overview.totalCourses === 0 ? (
          <EmptyAnalytics />
        ) : (
          <>
            {/* Overview Stats */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              <StatCard
                title="Total Revenue"
                value={analyticsData.overview.totalRevenue.toLocaleString()}
                change={analyticsData.overview.revenueChange}
                icon={DollarSign}
                color="bg-gradient-to-r from-green-500 to-emerald-600"
                prefix="$"
              />
              
              <StatCard
                title="Total Students"
                value={analyticsData.overview.totalStudents.toLocaleString()}
                change={analyticsData.overview.studentsChange}
                icon={Users}
                color="bg-gradient-to-r from-blue-500 to-blue-600"
              />
              
              <StatCard
                title="Published Courses"
                value={analyticsData.overview.totalCourses}
                change={analyticsData.overview.coursesChange}
                icon={BookOpen}
                color="bg-gradient-to-r from-purple-500 to-purple-600"
              />
              
              <StatCard
                title="Average Rating"
                value={analyticsData.overview.avgRating.toFixed(1)}
                change={analyticsData.overview.ratingChange}
                icon={Star}
                color="bg-gradient-to-r from-yellow-500 to-orange-600"
              />
            </motion.div>

            {/* Charts Section */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
              className="grid lg:grid-cols-3 gap-8 mb-8"
            >
              {/* Main Chart */}
              <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Revenue Trends</h2>
                  <div className="flex items-center space-x-2">
                    <select
                      value={selectedMetric}
                      onChange={(e) => setSelectedMetric(e.target.value)}
                      className="px-3 py-1 bg-slate-900/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="revenue">Revenue</option>
                      <option value="students">Students</option>
                      <option value="enrollments">Enrollments</option>
                    </select>
                  </div>
                </div>
                
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">Chart visualization will appear here</p>
                    <p className="text-slate-500 text-sm mt-2">Connect your analytics data to see trends</p>
                  </div>
                </div>
              </div>

              {/* Student Engagement */}
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">Student Engagement</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300 text-sm">Completion Rate</span>
                      <span className="text-white font-medium">{analyticsData.studentEngagement.completionRate}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
                        style={{ width: `${analyticsData.studentEngagement.completionRate}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300 text-sm">Avg. Time Spent</span>
                      <span className="text-white font-medium">{analyticsData.studentEngagement.avgTimeSpent}h</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <div className="flex-1 bg-slate-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                          style={{ width: `${Math.min(analyticsData.studentEngagement.avgTimeSpent * 10, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300 text-sm">Satisfaction Score</span>
                      <span className="text-white font-medium">{analyticsData.studentEngagement.satisfactionScore}/5</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <div className="flex-1 bg-slate-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600"
                          style={{ width: `${(analyticsData.studentEngagement.satisfactionScore / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-700">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Drop-off Rate</span>
                      <span className="text-red-400">{analyticsData.studentEngagement.dropoffRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Top Performing Courses */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.4 }}
              className="grid lg:grid-cols-2 gap-8 mb-8"
            >
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">Top Performing Courses</h3>
                
                {analyticsData.topCourses.length === 0 ? (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">No course performance data yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {analyticsData.topCourses.map((course, index) => (
                      <div key={course.id} className="flex items-center space-x-4 p-4 bg-slate-900/30 border border-slate-700 rounded-xl">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{course.title}</h4>
                          <p className="text-slate-400 text-sm">{course.students} students • ${course.revenue}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-bold">${course.revenue}</div>
                          <p className="text-slate-500 text-sm">Revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Activity */}
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
                
                {analyticsData.recentActivity.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">No recent activity</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {analyticsData.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-slate-900/30 border border-slate-700 rounded-xl">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-3"></div>
                        <div className="flex-1">
                          <p className="text-white text-sm">{activity.description}</p>
                          <p className="text-slate-500 text-xs mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.5 }}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  to="/educator/all-courses"
                  className="flex items-center space-x-3 p-4 bg-slate-900/30 border border-slate-700 rounded-xl hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 group"
                >
                  <Eye className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-300 group-hover:text-white transition-colors">View All Courses</span>
                </Link>
                
                <Link
                  to="/educator/add-course"
                  className="flex items-center space-x-3 p-4 bg-slate-900/30 border border-slate-700 rounded-xl hover:border-green-500/50 hover:bg-green-500/5 transition-all duration-300 group"
                >
                  <BookOpen className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300 group-hover:text-white transition-colors">Create Course</span>
                </Link>
                
                <Link
                  to="/educator/students"
                  className="flex items-center space-x-3 p-4 bg-slate-900/30 border border-slate-700 rounded-xl hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 group"
                >
                  <Users className="w-5 h-5 text-purple-400" />
                  <span className="text-slate-300 group-hover:text-white transition-colors">Manage Students</span>
                </Link>
                
                <button className="flex items-center space-x-3 p-4 bg-slate-900/30 border border-slate-700 rounded-xl hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all duration-300 group">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span className="text-slate-300 group-hover:text-white transition-colors">View Achievements</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default EducatorAnalytics;