import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { getCourseById } from '../../Api/courseApi.js';
import StripeCheckoutButton from '../Payment/StripeCheckoutButton';

const CourseDetails = () => {
  const params = useParams();
  const { id: courseId } = params; // Extract 'id' parameter and rename it to 'courseId'
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSection, setExpandedSection] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("URL params:", params);
  console.log("Extracted courseId:", courseId);

  const fetchCourseDetails = async () => {
    try {
      console.log("Fetching course details for ID:", courseId);
      setLoading(true);
      setError(null);
      const response = await getCourseById(courseId);
      console.log("Course details API response:", response);
      
      if (response.success && response.course) {
        setCourse(response.course);
        console.log("Course details set:", response.course);
      } else {
        throw new Error(response.message || "Failed to fetch course details");
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
      setError(error.message || "Failed to load course details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("CourseDetails component mounted with courseId:", courseId);
    if (courseId) {
      fetchCourseDetails();
    } else {
      console.error("No courseId found in URL parameters");
      setError("Course ID not provided");
      setLoading(false);
    }
  }, [courseId]);

  const handleBuyNow = () => {
    if (!course) return;
    // The StripeCheckoutButton component will handle redirecting to Stripe Checkout
    console.log("Payment will be handled by Stripe Checkout");
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24">
        <div className="container mx-auto px-6 lg:px-8 pb-16">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="animate-pulse">
                <div className="bg-slate-800 h-8 rounded w-3/4 mb-4"></div>
                <div className="bg-slate-800 h-12 rounded w-full mb-4"></div>
                <div className="bg-slate-800 h-6 rounded w-2/3 mb-6"></div>
                <div className="bg-slate-800 h-64 rounded-2xl"></div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="animate-pulse bg-slate-800 h-96 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24">
        <div className="container mx-auto px-6 lg:px-8 pb-16">
          <div className="text-center py-12">
            <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-8 max-w-md mx-auto">
              <h2 className="text-red-400 text-2xl font-bold mb-4">Error Loading Course</h2>
              <p className="text-slate-400 mb-6">{error}</p>
              <div className="space-y-3">
                <button
                  onClick={fetchCourseDetails}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/search')}
                  className="block w-full px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
                >
                  Browse Courses
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24">
        <div className="container mx-auto px-6 lg:px-8 pb-16">
          <div className="text-center py-12">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 max-w-md mx-auto">
              <h2 className="text-slate-300 text-2xl font-bold mb-4">Course Not Found</h2>
              <p className="text-slate-400 mb-6">The course you're looking for doesn't exist.</p>
              <button
                onClick={() => navigate('/search')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
              >
                Browse Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                  {course.category || 'General'}
                </span>
                {course.isPublished && (
                  <span className="px-3 py-1 bg-green-600/20 text-green-300 rounded-full text-sm">
                    Available
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {course.title}
              </h1>
              
              <p className="text-xl text-slate-300 mb-6 leading-relaxed">
                {course.description}
              </p>
              
              <div className="flex items-center space-x-6 text-slate-300">
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(course.rating || 4) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span>{course.rating || '4.0'} ({course.reviews?.length || 0} reviews)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>{course.enrolledStudents?.length || 0} students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration || 'N/A'}</span>
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
                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-600" />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between text-white text-sm">
                      <span>Preview: {course.title}</span>
                      <span>Preview</span>
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
                    {course.learningObjectives && course.learningObjectives.length > 0 ? (
                      course.learningObjectives.map((objective, i) => (
                        <div key={i} className="flex items-start space-x-3">
                          <Award className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                          <span className="text-slate-300">{objective}</span>
                        </div>
                      ))
                    ) : (
                      [...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-start space-x-3">
                          <Award className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                          <span className="text-slate-300">Learning objective from this comprehensive course</span>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-white mb-4 mt-8">Requirements</h3>
                  <ul className="space-y-2">
                    {course.requirements && course.requirements.length > 0 ? (
                      course.requirements.map((requirement, i) => (
                        <li key={i} className="flex items-start space-x-3 text-slate-300">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{requirement}</span>
                        </li>
                      ))
                    ) : (
                      [...Array(3)].map((_, i) => (
                        <li key={i} className="flex items-start space-x-3 text-slate-300">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Basic understanding of programming concepts</span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-white mb-6">Course Content</h3>
                  <div className="text-slate-300 mb-6">
                    {course.chapters?.length || 0} chapters • {course.chapters?.reduce((total, chapter) => total + (chapter.lectures?.length || 0), 0) || 0} lectures
                  </div>
                  
                  {course.chapters && course.chapters.length > 0 ? (
                    course.chapters.map((chapter, i) => (
                      <div key={chapter._id} className="border border-slate-600/50 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setExpandedSection(expandedSection === i ? null : i)}
                          className="w-full p-4 text-left bg-slate-700/30 hover:bg-slate-700/50 transition-colors duration-200"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-white font-medium">Chapter {i + 1}: {chapter.title}</h4>
                              <p className="text-slate-400 text-sm">{chapter.lectures?.length || 0} lectures</p>
                            </div>
                            {expandedSection === i ? (
                              <ChevronUp className="w-5 h-5 text-slate-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                        </button>
                        
                        {expandedSection === i && chapter.lectures && (
                          <div className="p-4 space-y-3">
                            {chapter.lectures.map((lecture, j) => (
                              <div key={lecture._id} className="flex items-center justify-between py-2">
                                <div className="flex items-center space-x-3">
                                  <Play className="w-4 h-4 text-slate-400" />
                                  <span className="text-slate-300">Lecture {j + 1}: {lecture.title}</span>
                                </div>
                                <span className="text-slate-400 text-sm">{lecture.duration || 'N/A'}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-slate-400">
                      <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No curriculum available for this course yet.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'instructor' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white mb-6">Your Instructor</h3>
                  <div className="flex items-start space-x-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex-shrink-0 overflow-hidden">
                      {course.educator?.profileImage ? (
                        <img
                          src={course.educator.profileImage}
                          alt={course.educator.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">
                        {course.educator?.name || 'Instructor'}
                      </h4>
                      <p className="text-blue-400 mb-4">
                        {course.educator?.title || 'Course Educator'}
                      </p>
                      <p className="text-slate-300 leading-relaxed">
                        {course.educator?.bio || 'Experienced educator passionate about sharing knowledge and helping students achieve their goals.'}
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
                    <span className="text-3xl font-bold text-white">₹{course.price || '0'}</span>
                    {course.originalPrice && course.originalPrice > course.price && (
                      <>
                        <span className="text-lg text-slate-400 line-through">₹{course.originalPrice}</span>
                        <span className="px-2 py-1 bg-green-600/20 text-green-300 text-sm rounded">
                          {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% off
                        </span>
                      </>
                    )}
                  </div>
                  {course.isPublished ? (
                    <p className="text-green-400 text-sm">Available for enrollment!</p>
                  ) : (
                    <p className="text-yellow-400 text-sm">Coming soon!</p>
                  )}
                </div>

                {/* Buy Button */}
                <div className="mb-4">
                  {course.isPublished ? (
                    <StripeCheckoutButton
                      course={course}
                      buttonText="Enroll Now"
                      className="w-full py-4 text-lg"
                    />
                  ) : (
                    <button
                      disabled
                      className="w-full py-4 font-semibold rounded-xl bg-slate-700 text-slate-400 cursor-not-allowed"
                    >
                      Not Available
                    </button>
                  )}
                </div>

                {/* Add to Cart */}
                

                {/* Course Info */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Duration</span>
                    <span className="text-white">{course.duration || 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Chapters</span>
                    <span className="text-white">{course.chapters?.length || 0} chapters</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Level</span>
                    <span className="text-white">{course.level || 'All Levels'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Category</span>
                    <span className="text-white">{course.category || 'General'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Students</span>
                    <span className="text-white">{course.enrolledStudents?.length || 0}</span>
                  </div>
                </div>

                {/* Includes */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-white font-semibold">This course includes:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 text-slate-300">
                      <Play className="w-4 h-4" />
                      <span>{course.chapters?.reduce((total, chapter) => total + (chapter.lectures?.length || 0), 0) || 0} video lectures</span>
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
                      <span>Access on mobile and desktop</span>
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