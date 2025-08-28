import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Trash2, Upload, Image, AlertCircle, Loader, Eye, EyeOff, X, Plus, BookOpen, Star } from 'lucide-react';

import { updateCourse, getCourseById, deleteCourse } from '../../Api/courseApi.js';
import { useAuth } from '../../context/AuthContext.jsx';

const EducatorEditAndDeleteCourse = () => {
  const navigate = useNavigate();
  const { id: courseId } = useParams();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    discount: 0,
    category: '',
    level: 'beginner',
    language: 'English',
    thumbnail: null,
    requirements: [''],
    whatYouWillLearn: [''],
    tags: [''],
    isPublished: false,
    estimatedDuration: 0
  });

  useEffect(() => {
    if (!courseId) {
      setError('No course ID provided.');
      return;
    }

    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getCourseById(courseId);
        if (res?.success && res.course) {
          const c = res.course;
          setFormData({
            title: c.title || '',
            description: c.description || '',
            price: c.price ?? 0,
            discount: c.discount ?? 0,
            category: c.category || '',
            level: c.level || 'beginner',
            language: c.language || 'English',
            thumbnail: c.thumbnail || null,
            requirements: (c.requirements && c.requirements.length) ? c.requirements : [''],
            whatYouWillLearn: (c.whatYouWillLearn && c.whatYouWillLearn.length) ? c.whatYouWillLearn : [''],
            tags: (c.tags && c.tags.length) ? c.tags : [''],
            isPublished: !!c.isPublished,
            estimatedDuration: c.estimatedDuration ?? 0
          });
          if (c.thumbnail) setImagePreview(c.thumbnail);
        } else {
          throw new Error(res?.message || 'Failed to load course');
        }
      } catch (err) {
        setError(err?.message || 'Failed to load course');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [courseId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].map((it, i) => i === index ? value : it) }));
  };

  const addArrayItem = (field) => setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  const removeArrayItem = (field, index) => setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
    setFormData(prev => ({ ...prev, thumbnail: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseId) {
      setError('No course ID provided.');
      return;
    }

    // For updates, we're more lenient - only validate if fields are being changed
    // and only show validation errors for truly empty required fields
    if (formData.title && !formData.title.trim()) {
      setError('Course title cannot be empty if provided.');
      return;
    }

    if (formData.description && !formData.description.trim()) {
      setError('Course description cannot be empty if provided.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const isFile = formData.thumbnail instanceof File;
      let payload = null;

      if (isFile) {
        payload = new FormData();
        payload.append('title', formData.title.trim());
        payload.append('description', formData.description.trim());
        payload.append('price', String(formData.price ?? 0));
        payload.append('discount', String(formData.discount ?? 0));
        payload.append('category', formData.category || '');
        payload.append('level', formData.level || 'beginner');
        payload.append('language', formData.language || 'English');
        payload.append('isPublished', String(Boolean(formData.isPublished)));
        payload.append('estimatedDuration', String(formData.estimatedDuration ?? 0));
        
        // Filter out empty array items before sending
        const filteredRequirements = formData.requirements?.filter(item => item.trim()) || [];
        const filteredLearning = formData.whatYouWillLearn?.filter(item => item.trim()) || [];
        const filteredTags = formData.tags?.filter(item => item.trim()) || [];
        
        payload.append('requirements', JSON.stringify(filteredRequirements));
        payload.append('whatYouWillLearn', JSON.stringify(filteredLearning));
        payload.append('tags', JSON.stringify(filteredTags));
        payload.append('thumbnail', formData.thumbnail);
      } else {
        // Filter out empty array items before sending
        const filteredRequirements = formData.requirements?.filter(item => item.trim()) || [];
        const filteredLearning = formData.whatYouWillLearn?.filter(item => item.trim()) || [];
        const filteredTags = formData.tags?.filter(item => item.trim()) || [];

        payload = {
          title: formData.title.trim(),
          description: formData.description.trim(),
          price: formData.price ?? 0,
          discount: formData.discount ?? 0,
          category: formData.category || '',
          level: formData.level || 'beginner',
          language: formData.language || 'English',
          isPublished: Boolean(formData.isPublished),
          estimatedDuration: formData.estimatedDuration ?? 0,
          requirements: filteredRequirements,
          whatYouWillLearn: filteredLearning,
          tags: filteredTags,
          thumbnail: typeof formData.thumbnail === 'string' ? formData.thumbnail : undefined
        };
      }

      console.log('Sending payload:', isFile ? 'FormData (check network tab)' : payload);

      const res = await updateCourse(courseId, payload);
      if (res?.success) {
        setSuccess('Course updated successfully!');
        setTimeout(() => navigate('/educator/dashboard'), 1500);
      } else {
        throw new Error(res?.message || 'Failed to update course');
      }
    } catch (err) {
      console.error('Update error:', err);
      setError(err?.message || 'Failed to update course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await deleteCourse(courseId);
      if (res?.success) {
        setSuccess('Course deleted.');
        setShowDeleteConfirm(false);
        setTimeout(() => navigate('/educator/dashboard'), 1200);
      } else {
        throw new Error(res?.message || 'Delete failed');
      }
    } catch (err) {
      setError(err?.message || 'Failed to delete course');
      setShowDeleteConfirm(false);
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24">
      <div className="container mx-auto px-6 lg:px-8 pb-16 max-w-3xl">

        {success && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-3 bg-green-600/10 rounded-md text-green-300">
            {success}
          </motion.div>
        )}

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-3 bg-red-600/10 rounded-md text-red-300 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" /> {error}
          </motion.div>
        )}

        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/educator/dashboard" className="p-2 hover:bg-slate-800 rounded-lg">
              <ArrowLeft className="w-6 h-6 text-slate-400" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Edit Course</h1>
              <p className="text-slate-300">Update your course details</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className={`px-3 py-1 rounded-lg ${formData.isPublished ? 'bg-green-600/10 text-green-300' : 'bg-yellow-600/10 text-yellow-300'}`}>
              {formData.isPublished ? <><Eye className="w-4 h-4 inline-block mr-1" /> Published</> : <><EyeOff className="w-4 h-4 inline-block mr-1" /> Draft</>}
            </div>
            <button onClick={() => setShowDeleteConfirm(true)} className="px-3 py-1 bg-red-600/20 text-red-300 rounded-lg">
              <Trash2 className="w-4 h-4 inline-block mr-1" /> Delete
            </button>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={fadeInUp} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2"><Image className="w-4 h-4" /><span>Thumbnail</span></h2>
            <div className="flex items-start gap-6">
              <div className="w-1/2">
                <div className="relative aspect-video bg-slate-900/50 border-2 border-dashed border-slate-600 rounded-lg overflow-hidden">
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="thumbnail" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => { setImagePreview(null); setFormData(prev => ({ ...prev, thumbnail: null })); }} className="absolute top-2 right-2 bg-black/50 rounded-full p-1"><X className="w-4 h-4 text-white" /></button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                      <Upload className="w-8 h-8 mb-2" />
                      <div className="text-sm">Upload or choose an image</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-1/2">
                <input id="thumb" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <label htmlFor="thumb" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" /> Choose Image
                </label>
                <p className="text-sm text-slate-400 mt-3">Recommended: 1280x720, max 5MB</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2"><BookOpen className="w-4 h-4" /><span>Basic Info</span></h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Course Title
                </label>
                <input 
                  name="title" 
                  value={formData.title} 
                  onChange={handleInputChange} 
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50" 
                  placeholder="Enter course title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Course Description
                </label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  rows={4} 
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50" 
                  placeholder="Describe your course in detail..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
                  <input 
                    name="category" 
                    value={formData.category} 
                    onChange={handleInputChange} 
                    className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50" 
                    placeholder="e.g., Web Development"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Difficulty Level</label>
                  <select 
                    name="level" 
                    value={formData.level} 
                    onChange={handleInputChange} 
                    className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="all-levels">All Levels</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Price ($)</label>
                  <input 
                    type="number" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleInputChange} 
                    min="0" 
                    step="0.01"
                    className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50" 
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Discount (%)</label>
                  <input 
                    type="number" 
                    name="discount" 
                    value={formData.discount} 
                    onChange={handleInputChange} 
                    min="0" 
                    max="100"
                    className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50" 
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Duration (mins)</label>
                  <input 
                    type="number" 
                    name="estimatedDuration" 
                    value={formData.estimatedDuration} 
                    onChange={handleInputChange} 
                    min="0"
                    className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50" 
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>What Students Will Learn</span>
            </h2>
            <div className="space-y-3">
              {formData.whatYouWillLearn.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input 
                    value={item} 
                    onChange={(e) => handleArrayChange('whatYouWillLearn', idx, e.target.value)} 
                    className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50" 
                    placeholder={`Learning objective ${idx + 1}`} 
                  />
                  {formData.whatYouWillLearn.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => removeArrayItem('whatYouWillLearn', idx)} 
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button 
                type="button" 
                onClick={() => addArrayItem('whatYouWillLearn')} 
                className="inline-flex items-center px-3 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Learning Objective
              </button>
            </div>
          </motion.div>

          {/* Publication Settings */}
          <motion.div variants={fadeInUp} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Publication Settings</span>
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Publish Course</h3>
                <p className="text-slate-400 text-sm mt-1">
                  Make this course available to students for enrollment
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className={`w-11 h-6 rounded-full transition-colors ${formData.isPublished ? 'bg-blue-600' : 'bg-slate-600'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${formData.isPublished ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
              </label>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex items-center justify-between pt-4">
            <Link to="/educator/dashboard" className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg">Cancel</Link>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setShowDeleteConfirm(true)} className="px-4 py-2 bg-red-600/20 text-red-300 rounded-lg">Delete</button>
              <button type="submit" disabled={loading} className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center gap-2">
                {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} <span>{loading ? 'Saving...' : 'Update Course'}</span>
              </button>
            </div>
          </motion.div>
        </form>

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-800 p-6 rounded-lg max-w-md w-full">
              <h3 className="text-lg font-semibold text-white mb-2">Delete Course</h3>
              <p className="text-slate-400 mb-4">Are you sure you want to delete "{formData.title}"?</p>
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg">Cancel</button>
                <button onClick={handleDelete} disabled={loading} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">{loading ? 'Deleting...' : 'Delete'}</button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducatorEditAndDeleteCourse;