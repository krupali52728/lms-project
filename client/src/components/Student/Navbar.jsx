import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Mock authentication state - you can replace this with your actual auth logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full bg-slate-950/95 backdrop-blur-lg border-b border-slate-800/50 z-50"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            
            <span className="text-2xl font-bold text-white">
              Course<span className="text-blue-400">Connect</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Icon */}
            <Link
              to="/search"
              className="p-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group"
              title="Search Courses"
            >
              <Search className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
            </Link>

            {/* Auth Section */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                {/* Profile/Dashboard Link */}
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-3 p-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200 group"
                  title="Student Dashboard"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">Dashboard</span>
                </Link>
                
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Login Button */}
                <Link
                  to="/login"
                  className="px-6 py-3 text-slate-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  Sign In
                </Link>
                
                {/* Sign Up Button */}
                <Link
                  to="/signup"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 text-slate-300 hover:text-white transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-900/50 backdrop-blur-sm border-t border-slate-800/50 py-6"
          >
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <Link
                to="/search"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200"
              >
                <Search className="w-5 h-5" />
                <span>Search Courses</span>
              </Link>

              {/* Mobile Auth Section */}
              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-200"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span>Dashboard</span>
                  </Link>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left px-4 py-3 text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3 px-4">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="py-3 text-slate-300 hover:text-white transition-colors duration-200 font-medium text-center border border-slate-600 rounded-xl hover:border-slate-500"
                  >
                    Sign In
                  </Link>
                  
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;