import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Save,
  Trash2,
  Edit,
  Eye,
  Upload,
  Image as ImageIcon,
  Plus,
  X,
  AlertTriangle,
  Settings,
  Users,
  DollarSign,
  Star,
  BookOpen
} from 'lucide-react';

const EducatorEditAndDeleteCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    difficulty: 'beginner',
    duration: '',
    thumbnail: null,
    tags: [],
    requirements: [''],
    objectives: [''],
    isPublished: false,
    status: 'draft'
  });

  const [currentTag, setCurrentTag] = useState('');

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // Simulate loading course data - replace with your API call
  useEffect(() => {
    const loadCourse = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For now, set empty form - replace this with actual API call
        // const response = await fetch(`/api/courses/${id}`);
        // const courseData = await response.json();
        // setCourseForm(courseData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading course:', error);
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourseForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (index, value, field) => {
    setCourseForm(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setCourseForm(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index, field) => {
    setCourseForm(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !courseForm.tags.includes(currentTag.trim())) {
      setCourseForm(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setCourseForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = async () => {
    try {
      // Here you would save the course to your backend
      console.log('Saving course:', courseForm);
      // const response = await fetch(`/api/courses/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(courseForm)
      // });
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleDelete = async () => {
    try {
      // Here you would delete the course from your backend
      console.log('Deleting course:', id);
      // const response = await fetch(`/api/courses/${id}`, {
      //   method: 'DELETE'
      // });
      
      setShowDeleteModal(false);
      navigate('/educator/all-courses');
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handlePublishToggle = () => {
    setCourseForm(prev => ({
      ...prev,
      isPublished: !prev.isPublished,
      status: prev.isPublished ? 'draft' : 'published'
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading course...</p>
        </div>
      </div>
    );
  }

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
              to="/educator/all-courses"
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-6 h-6 text-slate-400" />
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Edit Course
              </h1>
              <p className="text-slate-300 mt-2">
                Update your course information and content
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="px-4 py-2 bg-slate-700 text-slate-300 font-medium rounded-lg hover:bg-slate-600 hover:text-white transition-all duration-200 flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>{previewMode ? 'Edit' : 'Preview'}</span>
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Course not found message */}
        {!loading && !courseForm.title && (
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-center py-16"
          >
            <BookOpen className="w-20 h-20 text-slate-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Course not found</h3>
            <p className="text-slate-400 mb-8">
              The course you're looking for doesn't exist or you don't have permission to edit it.
            </p>
            <Link
              to="/educator/all-courses"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Courses</span>
            </Link>
          </motion.div>
        )}

        {/* Main Content */}
        {!loading && courseForm.title && (
          <>
            {previewMode ? (
              // Preview Mode
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8"
              >
                <div className="text-center mb-8">
                  <div className="w-full h-64 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 flex items-center justify-center">
                    {courseForm.thumbnail ? (
                      <span className="text-white">Thumbnail Preview</span>
                    ) : (
                      <ImageIcon className="w-16 h-16 text-white/50" />
                    )}
                  </div>
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <h1 className="text-3xl font-bold text-white">
                      {courseForm.title || 'Course Title'}
                    </h1>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      courseForm.isPublished
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {courseForm.status}
                    </span>
                  </div>
                  <p className="text-slate-300 max-w-2xl mx-auto">
                    {courseForm.description || 'Course description will appear here...'}
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold text-white mb-4">Course Information</h2>
                    <div className="space-y-4 text-slate-300">
                      <p><strong>Category:</strong> {courseForm.category || 'Not specified'}</p>
                      <p><strong>Difficulty:</strong> {courseForm.difficulty}</p>
                      <p><strong>Duration:</strong> {courseForm.duration || 'Not specified'}</p>
                      <p><strong>Price:</strong> ${courseForm.price || '0'}</p>
                    </div>
                  </div>

                  <div className="bg-slate-900/30 border border-slate-700 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Course Stats</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Students:</span>
                        <span className="text-white font-bold">0</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Revenue:</span>
                        <span className="text-white font-bold">$0</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Rating:</span>
                        <span className="text-white font-bold">0.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              // Edit Mode
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2 }}
                className="grid lg:grid-cols-3 gap-8"
              >
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Basic Information */}
                  <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Basic Information</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Course Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={courseForm.title}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          placeholder="Enter course title"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Description *
                        </label>
                        <textarea
                          name="description"
                          value={courseForm.description}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                          placeholder="Describe what students will learn..."
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Category *
                          </label>
                          <select
                            name="category"
                            value={courseForm.category}
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Price ($) *
                          </label>
                          <input
                            type="number"
                            name="price"
                            value={courseForm.price}
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            placeholder="e.g., 5h 30m"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Course Media */}
                  <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Course Media</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Course Thumbnail
                      </label>
                      <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center hover:border-slate-500 transition-colors duration-200">
                        <ImageIcon className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                        <p className="text-slate-400 mb-2">Drop new thumbnail here, or click to browse</p>
                        <p className="text-slate-500 text-sm">PNG, JPG up to 10MB</p>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => setCourseForm(prev => ({ ...prev, thumbnail: e.target.files[0] }))}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Publishing Controls */}
                  <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Publishing</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-900/30 border border-slate-700 rounded-xl">
                        <div>
                          <p className="text-white font-medium">Publication Status</p>
                          <p className="text-slate-400 text-sm">
                            {courseForm.isPublished ? 'Published and visible to students' : 'Draft - not visible to students'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={courseForm.isPublished}
                            onChange={handlePublishToggle}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="space-y-2">
                        <button
                          onClick={handleSave}
                          className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Course Statistics</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span className="text-slate-300">Students</span>
                        </div>
                        <span className="text-white font-bold">0</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300">Revenue</span>
                        </div>
                        <span className="text-white font-bold">$0</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-slate-300">Rating</span>
                        </div>
                        <span className="text-white font-bold">0.0</span>
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-red-400 mb-4">Danger Zone</h3>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                          <div>
                            <p className="text-red-400 font-medium text-sm">Delete Course</p>
                            <p className="text-slate-400 text-xs mt-1">
                              This action cannot be undone.
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="w-full px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Course</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-800 border border-slate-700 rounded-3xl p-8 max-w-md w-full"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4">Delete Course?</h2>
                <p className="text-slate-400 mb-8">
                  This action cannot be undone. This will permanently delete the course and all associated data.
                </p>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-2 border border-slate-600 text-slate-300 font-medium rounded-lg hover:border-slate-500 hover:text-white transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-200"
                  >
                    Delete Course
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EducatorEditAndDeleteCourse;