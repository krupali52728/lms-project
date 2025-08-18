import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  Download,
  BookOpen,
  Award,
  Globe,
  Smartphone,
  ChevronDown,
  ChevronUp,
 
  ShoppingCart
} from 'lucide-react';

const CourseDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSection, setExpandedSection] = useState(null);

  // Mock course data structure (no actual data)
  const courseStructure = {
    title: '',
    instructor: '',
    rating: 0,
    students: 0,
    duration: '',
    level: '',
    price: 0,
    originalPrice: 0,
    description: '',
    sections: []
  };

  const handleBuyNow = () => {
    // Redirect to Stripe payment page
    window.location.href = 'https://checkout.stripe.com/your-stripe-session-id';
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24">
      <div className="container mx-auto px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="mb-8"
            >
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm">
                  Web Development
                </span>
                <span className="px-3 py-1 bg-green-600/20 text-green-300 rounded-full text-sm">
                  Bestseller
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Course Title Here
              </h1>
              
              <p className="text-xl text-slate-300 mb-6 leading-relaxed">
                Course description will be loaded dynamically from your server.
              </p>
              
              <div className="flex items-center space-x-6 text-slate-300">
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span>4.8 (2,456 reviews)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>15,420 students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>42 hours</span>
                </div>
              </div>
            </motion.div>

            {/* Video Preview */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
              className="relative mb-8"
            >
              <div className="aspect-video bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between text-white text-sm">
                      <span>Preview: Introduction to the Course</span>
                      <span>5:30</span>
                    </div>
                  </div>
                </div>
              </div>
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
                  {['overview', 'curriculum', 'instructor', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-2 border-b-2 font-medium text-sm capitalize transition-colors duration-200 ${
                        activeTab === tab
                          ? 'border-blue-500 text-blue-400'
                          : 'border-transparent text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8"
            >
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white mb-4">What you'll learn</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <Award className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                        <span className="text-slate-300">Learning objective will be loaded from server</span>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-white mb-4 mt-8">Requirements</h3>
                  <ul className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <li key={i} className="flex items-start space-x-3 text-slate-300">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Requirement will be loaded from server</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-white mb-6">Course Content</h3>
                  <div className="text-slate-300 mb-6">
                    12 sections • 89 lectures • 42h 15m total length
                  </div>
                  
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="border border-slate-600/50 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpandedSection(expandedSection === i ? null : i)}
                        className="w-full p-4 text-left bg-slate-700/30 hover:bg-slate-700/50 transition-colors duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">Section {i + 1}: Section Title</h4>
                            <p className="text-slate-400 text-sm">8 lectures • 3h 25m</p>
                          </div>
                          {expandedSection === i ? (
                            <ChevronUp className="w-5 h-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                      </button>
                      
                      {expandedSection === i && (
                        <div className="p-4 space-y-3">
                          {[...Array(4)].map((_, j) => (
                            <div key={j} className="flex items-center justify-between py-2">
                              <div className="flex items-center space-x-3">
                                <Play className="w-4 h-4 text-slate-400" />
                                <span className="text-slate-300">Lecture {j + 1}: Lecture Title</span>
                              </div>
                              <span className="text-slate-400 text-sm">12:34</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'instructor' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white mb-6">Your Instructor</h3>
                  <div className="flex items-start space-x-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex-shrink-0"></div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">Instructor Name</h4>
                      <p className="text-blue-400 mb-4">Senior Full Stack Developer</p>
                      <p className="text-slate-300 leading-relaxed">
                        Instructor bio and credentials will be loaded from your server.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white mb-6">Student Reviews</h3>
                  <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="border-b border-slate-700 pb-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-white font-medium">Student Name</span>
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, j) => (
                                  <Star key={j} className="w-4 h-4 fill-current" />
                                ))}
                              </div>
                            </div>
                            <p className="text-slate-300">
                              Review content will be loaded from your server.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.4 }}
              className="sticky top-24"
            >
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline space-x-3 mb-2">
                    <span className="text-3xl font-bold text-white">$89.99</span>
                    <span className="text-lg text-slate-400 line-through">$199.99</span>
                    <span className="px-2 py-1 bg-green-600/20 text-green-300 text-sm rounded">55% off</span>
                  </div>
                  <p className="text-red-400 text-sm">2 days left at this price!</p>
                </div>

                {/* Buy Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 mb-4"
                >
                  Buy Now
                </button>

                {/* Add to Cart */}
                

                {/* Course Info */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Duration</span>
                    <span className="text-white">42 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Lectures</span>
                    <span className="text-white">89 lectures</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Level</span>
                    <span className="text-white">All Levels</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Language</span>
                    <span className="text-white">English</span>
                  </div>
                </div>

                {/* Includes */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-white font-semibold">This course includes:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 text-slate-300">
                      <Play className="w-4 h-4" />
                      <span>42 hours on-demand video</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-300">
                      <Download className="w-4 h-4" />
                      <span>Downloadable resources</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-300">
                      <Award className="w-4 h-4" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-300">
                      <Smartphone className="w-4 h-4" />
                      <span>Access on mobile and TV</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-300">
                      <Globe className="w-4 h-4" />
                      <span>Full lifetime access</span>
                    </div>
                  </div>
                </div>

                
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;