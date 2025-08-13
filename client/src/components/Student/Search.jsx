import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search as SearchIcon, 
  Filter, 
  Clock,
  Star,
  Users,
  BookOpen,
  X,
  TrendingUp
} from 'lucide-react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [
    'All',
    'Web Development',
    'Data Science',
    'Mobile Development',
    'Design',
    'Marketing',
    'Business'
  ];

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm, 'Category:', selectedCategory, 'Level:', selectedLevel);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedLevel('All');
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24 pb-16">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Find Your Perfect
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent block mt-2">
              Learning Path
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover thousands of courses designed to help you master new skills and advance your career
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <form onSubmit={handleSearch} className="relative">
            <div className="flex items-center bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-2 shadow-2xl">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="What do you want to learn today?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-6 py-4 bg-transparent text-white placeholder-slate-400 focus:outline-none text-lg"
                />
              </div>
              
              <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="p-4 text-slate-400 hover:text-white transition-colors duration-200 mr-2"
              >
                <Filter className="w-6 h-6" />
              </button>
              
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                Search
              </button>
            </div>
          </form>

          {/* Filters Panel */}
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Filters</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={clearFilters}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Category
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          selectedCategory === category
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Level Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Difficulty Level
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {levels.map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          selectedLevel === level
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Popular Searches */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Popular Searches</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {['JavaScript', 'Python', 'React', 'Data Science', 'UI/UX Design', 'Machine Learning'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="px-6 py-3 bg-slate-800/50 border border-slate-600/50 rounded-full text-slate-300 hover:text-white hover:border-slate-500/50 transition-all duration-200"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Search Stats */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
              <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">500+</div>
              <div className="text-slate-400 text-sm">Courses Available</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-600/20 to-purple-700/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">50K+</div>
              <div className="text-slate-400 text-sm">Active Students</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-r from-green-600/20 to-green-700/20 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6">
              <Star className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">4.9</div>
              <div className="text-slate-400 text-sm">Average Rating</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-700/20 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-6">
              <TrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">95%</div>
              <div className="text-slate-400 text-sm">Completion Rate</div>
            </div>
          </div>
        </motion.div>

        {/* Search Results Placeholder */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-12">
            <SearchIcon className="w-16 h-16 text-slate-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-slate-400 mb-2">Start Your Search</h3>
            <p className="text-slate-500">Enter a keyword or select filters to find the perfect course for you</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Search;
