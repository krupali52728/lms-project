import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  BookOpen, 
  Users, 
  DollarSign,
  TrendingUp,
  BarChart3,
  Settings,
  ArrowRight,
  Target,
  Clock,
  Star
} from 'lucide-react';

const EducatorDashboard = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Navigation cards for different sections
  const dashboardSections = [
    {
      title: 'Create Course',
      description: 'Create and publish new courses for students',
      icon: Plus,
      path: '/educator/create-course',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: 'All Courses',
      description: 'View and manage all your published courses',
      icon: BookOpen,
      path: '/educator/all-courses',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20'
    },
    {
      title: 'Analytics',
      description: 'Track performance and revenue insights',
      icon: BarChart3,
      path: '/educator/analytics',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      title: 'Students',
      description: 'Manage enrolled students and interactions',
      icon: Users,
      path: '/educator/students',
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20'
    }
  ];

  // Quick stats (placeholder - you'll replace with real data from your backend)
  const quickStats = [
    { label: 'Total Courses', value: '0', icon: BookOpen, color: 'blue' },
    { label: 'Total Students', value: '0', icon: Users, color: 'green' },
    { label: 'Total Revenue', value: '$0', icon: DollarSign, color: 'purple' },
    { label: 'Avg Rating', value: '0.0', icon: Star, color: 'yellow' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24">
      <div className="container mx-auto px-6 lg:px-8 pb-16">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Educator Dashboard
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Welcome to your teaching hub. Manage courses, track analytics, and engage with students all in one place.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {quickStats.map((stat, index) => {
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
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Dashboard Sections */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {dashboardSections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <Link
                key={section.title}
                to={section.path}
                className="block group"
              >
                <div className={`${section.bgColor} ${section.borderColor} border backdrop-blur-xl rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${section.color} rounded-2xl flex items-center justify-center`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {section.title}
                  </h3>
                  
                  <p className="text-slate-400 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.6 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/educator/create-course"
              className="flex items-center space-x-3 p-4 bg-slate-900/30 border border-slate-700 rounded-xl hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 group"
            >
              <Plus className="w-5 h-5 text-blue-400" />
              <span className="text-slate-300 group-hover:text-white transition-colors">New Course</span>
            </Link>
            
            <Link
              to="/educator/all-courses"
              className="flex items-center space-x-3 p-4 bg-slate-900/30 border border-slate-700 rounded-xl hover:border-green-500/50 hover:bg-green-500/5 transition-all duration-300 group"
            >
              <BookOpen className="w-5 h-5 text-green-400" />
              <span className="text-slate-300 group-hover:text-white transition-colors">View Courses</span>
            </Link>
            
            <Link
              to="/educator/analytics"
              className="flex items-center space-x-3 p-4 bg-slate-900/30 border border-slate-700 rounded-xl hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 group"
            >
              <BarChart3 className="w-5 h-5 text-purple-400" />
              <span className="text-slate-300 group-hover:text-white transition-colors">Analytics</span>
            </Link>
            
            <Link
              to="/educator/students"
              className="flex items-center space-x-3 p-4 bg-slate-900/30 border border-slate-700 rounded-xl hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all duration-300 group"
            >
              <Users className="w-5 h-5 text-yellow-400" />
              <span className="text-slate-300 group-hover:text-white transition-colors">Students</span>
            </Link>
          </div>
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20 rounded-3xl p-8">
            <Target className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Teaching?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Share your expertise with students worldwide. Create engaging courses and build your teaching career.
            </p>
            <Link
              to="/educator/create-course"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Create Your First Course</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EducatorDashboard;
