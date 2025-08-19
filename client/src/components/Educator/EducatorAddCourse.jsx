import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Save,
  Upload,
  Image as ImageIcon,
  Video,
  FileText,
  Plus,
  X,
  Eye,
  AlertCircle
} from 'lucide-react';

const EducatorAddCourse = () => {
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
    isPublished: false
  });

  const [currentTag, setCurrentTag] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

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

  const handleSaveDraft = () => {
    // Here you would save as draft to your backend
    console.log('Saving draft:', { ...courseForm, isPublished: false });
  };

  const handlePublish = () => {
    // Here you would publish to your backend
    console.log('Publishing course:', { ...courseForm, isPublished: true });
  };

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
                Create New Course
              </h1>
              <p className="text-slate-300 mt-2">
                Share your knowledge with students worldwide
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
              onClick={handleSaveDraft}
              className="px-4 py-2 border border-slate-600 text-slate-300 font-medium rounded-lg hover:border-slate-500 hover:text-white transition-all duration-200"
            >
              Save Draft
            </button>
            <button
              onClick={handlePublish}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Publish Course</span>
            </button>
          </div>
        </motion.div>

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
              <h1 className="text-3xl font-bold text-white mb-4">
                {courseForm.title || 'Course Title'}
              </h1>
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
                <h3 className="text-lg font-bold text-white mb-4">Course Details</h3>
                {courseForm.tags.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-slate-400 mb-2">Tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {courseForm.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-lg">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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
                      placeholder="Enter an engaging course title"
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
                      placeholder="Describe what students will learn in this course..."
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
                        <option value="Marketing">Marketing</option>
                        <option value="Photography">Photography</option>
                        <option value="Music">Music</option>
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
                    <p className="text-slate-400 mb-2">Drop your thumbnail here, or click to browse</p>
                    <p className="text-slate-500 text-sm">PNG, JPG up to 10MB. Recommended: 1280x720px</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setCourseForm(prev => ({ ...prev, thumbnail: e.target.files[0] }))}
                    />
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Course Details</h2>
                
                <div className="space-y-6">
                  {/* Learning Objectives */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Learning Objectives
                    </label>
                    <p className="text-xs text-slate-500 mb-3">What will students learn from this course?</p>
                    {courseForm.objectives.map((objective, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={objective}
                          onChange={(e) => handleArrayChange(index, e.target.value, 'objectives')}
                          className="flex-1 px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          placeholder="Enter learning objective"
                        />
                        {courseForm.objectives.length > 1 && (
                          <button
                            onClick={() => removeArrayItem(index, 'objectives')}
                            className="p-2 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => addArrayItem('objectives')}
                      className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add objective</span>
                    </button>
                  </div>

                  {/* Prerequisites */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Prerequisites
                    </label>
                    <p className="text-xs text-slate-500 mb-3">What should students know before taking this course?</p>
                    {courseForm.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={requirement}
                          onChange={(e) => handleArrayChange(index, e.target.value, 'requirements')}
                          className="flex-1 px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          placeholder="Enter prerequisite"
                        />
                        {courseForm.requirements.length > 1 && (
                          <button
                            onClick={() => removeArrayItem(index, 'requirements')}
                            className="p-2 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => addArrayItem('requirements')}
                      className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add prerequisite</span>
                    </button>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Tags
                    </label>
                    <p className="text-xs text-slate-500 mb-3">Add tags to help students find your course</p>
                    <div className="flex items-center space-x-2 mb-3">
                      <input
                        type="text"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="flex-1 px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        placeholder="Enter a tag and press Enter"
                      />
                      <button
                        onClick={addTag}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    {courseForm.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {courseForm.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="flex items-center space-x-1 px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm rounded-lg"
                          >
                            <span>{tag}</span>
                            <button
                              onClick={() => removeTag(tag)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publishing Options */}
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Publishing</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <p className="text-blue-400 font-medium text-sm">Ready to publish?</p>
                        <p className="text-slate-400 text-xs mt-1">
                          Make sure all required fields are filled before publishing.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={handleSaveDraft}
                      className="w-full px-4 py-2 border border-slate-600 text-slate-300 font-medium rounded-lg hover:border-slate-500 hover:text-white transition-all duration-200"
                    >
                      Save as Draft
                    </button>
                    <button
                      onClick={handlePublish}
                      className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                    >
                      Publish Course
                    </button>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Tips for Success</h3>
                
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <p>Write a compelling course title that clearly describes what students will learn.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <p>Use high-quality thumbnails to attract students to your course.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <p>Be specific about learning objectives and prerequisites.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <p>Add relevant tags to help students discover your course.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EducatorAddCourse;