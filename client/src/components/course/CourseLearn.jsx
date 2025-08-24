import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play,
  PlayCircle,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Settings,
  Maximize,
  Download,
  FileText,
  CheckCircle,
  Lock,
  Clock,
  BookOpen,
  User,
  ArrowLeft,
  Menu,
  X,
  Star
} from 'lucide-react';
import { getCourseById } from '../../Api/courseApi';
import { checkCoursePurchase } from '../../Api/userApi';
import { getLectureWithAccess } from '../../Api/lectureApi';
import { useAuth } from '../../context/AuthContext';

const CourseLearn = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  
  // Course and content state
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [accessLoading, setAccessLoading] = useState(true);
  
  // Current learning state
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentLecture, setCurrentLecture] = useState(0);
  const [completedLectures, setCompletedLectures] = useState(new Set());
  const [currentVideoData, setCurrentVideoData] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);
  
  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  // Check access on component mount
  useEffect(() => {
    const checkAccess = async () => {
      if (!isLoggedIn) {
        navigate('/login');
        return;
      }

      try {
        console.log('Checking access for course:', courseId);
        const response = await checkCoursePurchase(courseId);
        console.log('Access check response:', response);
        
        if (response.success && response.isEnrolled) {
          setHasAccess(true);
        } else {
          setHasAccess(false);
          setError('You need to purchase this course to access the content.');
        }
      } catch (error) {
        console.error('Access check failed:', error);
        setHasAccess(false);
        setError('Failed to verify course access.');
      } finally {
        setAccessLoading(false);
      }
    };

    checkAccess();
  }, [courseId, isLoggedIn, navigate]);

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      if (!hasAccess) return;
      
      try {
        setLoading(true);
        console.log('Fetching course data for:', courseId);
        const response = await getCourseById(courseId);
        
        if (response.success && response.course) {
          setCourse(response.course);
          console.log('Course data loaded:', response.course);
          console.log('Chapters:', response.course.chapters);
          if (response.course.chapters && response.course.chapters.length > 0) {
            console.log('First chapter content:', response.course.chapters[0]);
          }
        } else {
          setError('Course not found');
        }
      } catch (error) {
        console.error('Failed to fetch course:', error);
        setError('Failed to load course data');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, hasAccess]);

  // Load current lecture video
  useEffect(() => {
    const loadCurrentLecture = async () => {
      if (!course?.chapters?.[currentChapter]?.chapterContent?.[currentLecture]) return;

      const lectureId = course.chapters[currentChapter].chapterContent[currentLecture]._id;
      if (!lectureId) return;

      try {
        setVideoLoading(true);
        console.log('Loading lecture:', lectureId);
        const response = await getLectureWithAccess(lectureId);
        
        if (response.success) {
          setCurrentVideoData(response.lecture);
          console.log('Lecture loaded:', response.lecture);
        } else {
          console.error('Failed to load lecture:', response.message);
        }
      } catch (error) {
        console.error('Error loading lecture:', error);
      } finally {
        setVideoLoading(false);
      }
    };

    loadCurrentLecture();
  }, [course, currentChapter, currentLecture]);

  // Navigation functions
  const goToPreviousLecture = useCallback(() => {
    if (currentLecture > 0) {
      setCurrentLecture(currentLecture - 1);
    } else if (currentChapter > 0 && course?.chapters) {
      const prevChapter = course.chapters[currentChapter - 1];
      setCurrentChapter(currentChapter - 1);
      setCurrentLecture((prevChapter.chapterContent?.length || 1) - 1);
    }
  }, [currentLecture, currentChapter, course?.chapters]);

  const goToNextLecture = useCallback(() => {
    if (!course?.chapters) return;
    const currentChapterLectures = course.chapters[currentChapter]?.chapterContent || [];
    if (currentLecture + 1 < currentChapterLectures.length) {
      setCurrentLecture(currentLecture + 1);
    } else if (currentChapter + 1 < course.chapters.length) {
      setCurrentChapter(currentChapter + 1);
      setCurrentLecture(0);
    }
  }, [currentLecture, currentChapter, course?.chapters]);

  const canGoPrevious = useCallback(() => {
    return currentChapter > 0 || currentLecture > 0;
  }, [currentChapter, currentLecture]);

  const canGoNext = useCallback(() => {
    if (!course?.chapters) return false;
    const currentChapterLectures = course.chapters[currentChapter]?.chapterContent || [];
    return (currentLecture + 1 < currentChapterLectures.length) || 
           (currentChapter + 1 < course.chapters.length);
  }, [currentLecture, currentChapter, course?.chapters]);

  // Fetch course data
  useEffect(() => {
    const fetchCourseData = async () => {
      if (!hasAccess) return;
      
      try {
        setLoading(true);
        const response = await getCourseById(courseId);
        if (response.success && response.course) {
          setCourse(response.course);
        } else {
          setError('Course not found or access denied');
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        setError('Failed to load course content');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId, hasAccess]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only handle shortcuts when not typing in an input/textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowLeft':
          if (canGoPrevious()) {
            e.preventDefault();
            goToPreviousLecture();
          }
          break;
        case 'ArrowRight':
          if (canGoNext()) {
            e.preventDefault();
            goToNextLecture();
          }
          break;
        case ' ': // Spacebar
          e.preventDefault();
          const video = document.querySelector('video');
          if (video) {
            if (video.paused) {
              video.play();
            } else {
              video.pause();
            }
          }
          break;
        case 'Escape':
          setSidebarOpen(!sidebarOpen);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [canGoPrevious, canGoNext, sidebarOpen]);

  // Handle lecture completion
  const markLectureComplete = (chapterIndex, lectureIndex) => {
    const lectureKey = `${chapterIndex}-${lectureIndex}`;
    setCompletedLectures(prev => new Set([...prev, lectureKey]));
    
    // Auto-advance to next lecture
    const currentChapterLectures = course.chapters[chapterIndex]?.chapterContent || [];
    if (lectureIndex + 1 < currentChapterLectures.length) {
      setCurrentLecture(lectureIndex + 1);
    } else if (chapterIndex + 1 < course.chapters.length) {
      setCurrentChapter(chapterIndex + 1);
      setCurrentLecture(0);
    }
  };

  // Get current lecture data
  const getCurrentLecture = () => {
    if (!course?.chapters?.[currentChapter]?.chapterContent?.[currentLecture]) {
      return null;
    }
    return course.chapters[currentChapter].chapterContent[currentLecture];
  };

  // Calculate progress
  const getProgress = () => {
    if (!course?.chapters) return 0;
    
    const totalLectures = course.chapters.reduce((total, chapter) => 
      total + (chapter.chapterContent?.length || 0), 0
    );
    
    return totalLectures > 0 ? (completedLectures.size / totalLectures) * 100 : 0;
  };

  const isLectureCompleted = (chapterIndex, lectureIndex) => {
    return completedLectures.has(`${chapterIndex}-${lectureIndex}`);
  };

  if (accessLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">
            {accessLoading ? 'Verifying access...' : 'Loading course content...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-8">
            <h2 className="text-red-400 text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-slate-400 mb-6">{error}</p>
            <button
              onClick={() => navigate(`/course/${courseId}`)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
            >
              Back to Course Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-950 flex overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-slate-900 border-r border-slate-800 flex flex-col overflow-hidden`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(`/course/${courseId}`)}
              className="flex items-center text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-slate-400 hover:text-white lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <h2 className="text-white font-semibold mb-2 line-clamp-2">{course?.title}</h2>
          
          {/* Progress Bar */}
          <div className="mb-2">
            <div className="flex justify-between text-sm text-slate-400 mb-1">
              <span>Progress</span>
              <span>{Math.round(getProgress())}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
          </div>
          
          <p className="text-slate-400 text-sm">
            {completedLectures.size} of {course?.chapters?.reduce((total, chapter) => total + (chapter.chapterContent?.length || 0), 0)} lectures completed
          </p>
        </div>

        {/* Course Content */}
        <div className="flex-1 overflow-y-auto">
          {course?.chapters?.map((chapter, chapterIndex) => (
            <div key={chapter._id} className="border-b border-slate-800">
              <div className="p-4">
                <h3 className="text-white font-medium mb-3">
                  Chapter {chapterIndex + 1}: {chapter.chapterTitle}
                </h3>
                
                <div className="space-y-2">
                  {chapter.chapterContent?.map((lecture, lectureIndex) => (
                    <button
                      key={lecture._id}
                      onClick={() => {
                        setCurrentChapter(chapterIndex);
                        setCurrentLecture(lectureIndex);
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                        currentChapter === chapterIndex && currentLecture === lectureIndex
                          ? 'bg-blue-600/20 border border-blue-500/30 text-blue-300'
                          : 'hover:bg-slate-800/50 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {isLectureCompleted(chapterIndex, lectureIndex) ? (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          ) : currentChapter === chapterIndex && currentLecture === lectureIndex ? (
                            <PlayCircle className="w-5 h-5 text-blue-400" />
                          ) : (
                            <Play className="w-5 h-5 text-slate-500" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-medium line-clamp-2">
                            {lecture.title}
                          </p>
                          <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {lecture.duration || '5 min'}
                            </span>
                            {lecture.type && (
                              <span className="flex items-center">
                                {lecture.type === 'video' ? (
                                  <Play className="w-3 h-3 mr-1" />
                                ) : (
                                  <FileText className="w-3 h-3 mr-1" />
                                )}
                                {lecture.type}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
              
              <div>
                <h1 className="text-white font-semibold">
                  {currentVideoData?.title || 'Select a lecture'}
                </h1>
                <p className="text-slate-400 text-sm">
                  Chapter {currentChapter + 1} - Lecture {currentLecture + 1}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowNotes(!showNotes)}
                className={`p-2 rounded-lg transition-colors ${
                  showNotes ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <FileText className="w-5 h-5" />
              </button>
              
              <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>

              {/* Navigation Controls */}
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={goToPreviousLecture}
                  disabled={!canGoPrevious()}
                  className={`p-2 rounded-lg transition-colors ${
                    canGoPrevious() 
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800' 
                      : 'text-slate-600 cursor-not-allowed'
                  }`}
                  title="Previous Lecture"
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                <button
                  onClick={goToNextLecture}
                  disabled={!canGoNext()}
                  className={`p-2 rounded-lg transition-colors ${
                    canGoNext() 
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800' 
                      : 'text-slate-600 cursor-not-allowed'
                  }`}
                  title="Next Lecture"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video/Content Area */}
        <div className="flex-1 flex">
          <div className="flex-1 bg-black relative">
            {accessLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                  <p>Verifying access...</p>
                </div>
              </div>
            ) : !hasAccess ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-white max-w-md mx-auto p-8">
                  <Lock className="w-16 h-16 mx-auto mb-4 text-red-400" />
                  <h3 className="text-xl font-semibold mb-2">Access Denied</h3>
                  <p className="text-slate-300 mb-4">{error || 'You need to purchase this course to access the content.'}</p>
                  <button
                    onClick={() => navigate(`/course/${courseId}`)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Back to Course
                  </button>
                </div>
              </div>
            ) : videoLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                  <p>Loading lecture...</p>
                </div>
              </div>
            ) : currentVideoData ? (
              <div className="w-full h-full">
                {currentVideoData.videoUrl ? (
                  <div className="w-full h-full relative">
                    {/* Video Player */}
                    <video
                      key={currentVideoData._id} // Force re-render when lecture changes
                      className="w-full h-full object-contain"
                      controls
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                      onEnded={() => {
                        setIsVideoPlaying(false);
                        markLectureComplete(currentChapter, currentLecture);
                      }}
                      poster={course?.thumbnail} // Use course thumbnail as poster
                    >
                      <source src={currentVideoData.videoUrl} type="video/mp4" />
                      <source src={currentVideoData.videoUrl} type="video/webm" />
                      <source src={currentVideoData.videoUrl} type="video/ogg" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Custom Overlay for Better UX */}
                    <div className="absolute top-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
                      <h3 className="font-semibold text-lg mb-1">{currentVideoData.title}</h3>
                      <p className="text-sm text-slate-300">
                        Chapter {currentChapter + 1}, Lecture {currentLecture + 1}
                        {currentVideoData.duration && ` • ${currentVideoData.duration}`}
                      </p>
                    </div>

                    {/* Mark Complete Button */}
                    {!isLectureCompleted(currentChapter, currentLecture) && (
                      <div className="absolute top-4 right-4">
                        <button
                          onClick={() => markLectureComplete(currentChapter, currentLecture)}
                          className="px-4 py-2 bg-green-600/80 hover:bg-green-600 text-white rounded-lg backdrop-blur-sm transition-colors text-sm font-medium"
                        >
                          Mark as Complete
                        </button>
                      </div>
                    )}

                    {/* Completed Indicator */}
                    {isLectureCompleted(currentChapter, currentLecture) && (
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center space-x-2 px-4 py-2 bg-green-600/80 text-white rounded-lg backdrop-blur-sm">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Completed</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Fallback for lectures without video */
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <FileText className="w-12 h-12 text-blue-400" />
                      </div>
                      <h3 className="text-white text-xl font-semibold mb-2">
                        {getCurrentLecture()?.title || 'Lecture Content'}
                      </h3>
                      <p className="text-slate-400 mb-4">
                        This lecture contains text content or resources
                      </p>
                      <button
                        onClick={() => markLectureComplete(currentChapter, currentLecture)}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        Mark as Complete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-900">
                <div className="text-center">
                  <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-slate-400 text-xl">Select a lecture to start learning</h3>
                </div>
              </div>
            )}
          </div>

          {/* Notes Panel */}
          {showNotes && (
            <div className="w-80 bg-slate-900 border-l border-slate-800 p-6">
              <h3 className="text-white font-semibold mb-4">Notes</h3>
              <div className="space-y-4">
                <textarea
                  className="w-full h-32 bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Take notes while learning..."
                />
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Save Notes
                </button>
              </div>

              <div className="mt-6">
                <h4 className="text-slate-300 font-medium mb-3">Resources</h4>
                <div className="space-y-2">
                  <button className="flex items-center space-x-2 text-slate-400 hover:text-blue-400 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download Materials</span>
                  </button>
                  <button className="flex items-center space-x-2 text-slate-400 hover:text-blue-400 transition-colors">
                    <FileText className="w-4 h-4" />
                    <span>Course Transcript</span>
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-slate-300 font-medium mb-3">Shortcuts</h4>
                <div className="space-y-1 text-xs text-slate-500">
                  <div className="flex justify-between">
                    <span>Previous Lecture</span>
                    <span>← Arrow</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Lecture</span>
                    <span>→ Arrow</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Play/Pause</span>
                    <span>Space</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Toggle Sidebar</span>
                    <span>Esc</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseLearn;
