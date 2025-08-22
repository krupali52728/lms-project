import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CourseCard from "./CourseCard";
import { getAllCourses } from "../../Api/courseApi.js";

const CoursesSection = () => {
  const navigate = useNavigate();
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      console.log("Fetching all courses...");
      setLoading(true);
      const response = await getAllCourses();
      console.log("Courses API response:", response);
      
      if (response.success && response.courses) {
        // Get only first 6 courses for featured section
        setFeaturedCourses(response.courses.slice(0, 6));
        console.log("Featured courses set:", response.courses.slice(0, 6));
      } else {
        throw new Error(response.message || "Failed to fetch courses");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError(error.message || "Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured Courses
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover our most popular courses designed by industry experts to
            help you master new skills and advance your career
          </p>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {loading ? (
            // Loading state
            [...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800 rounded-2xl p-6 animate-pulse"
              >
                <div className="bg-slate-700 h-48 rounded-xl mb-4"></div>
                <div className="bg-slate-700 h-4 rounded mb-2"></div>
                <div className="bg-slate-700 h-4 rounded w-3/4"></div>
              </motion.div>
            ))
          ) : error ? (
            // Error state
            <motion.div
              variants={fadeInUp}
              className="col-span-full text-center py-12"
            >
              <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-8">
                <p className="text-red-400 text-lg mb-4">Failed to load courses</p>
                <p className="text-slate-400 mb-6">{error}</p>
                <button
                  onClick={fetchCourses}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          ) : featuredCourses.length === 0 ? (
            // No courses state
            <motion.div
              variants={fadeInUp}
              className="col-span-full text-center py-12"
            >
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
                <p className="text-slate-300 text-lg">No courses available</p>
                <p className="text-slate-400 mt-2">Check back later for new courses</p>
              </div>
            </motion.div>
          ) : (
            // Courses list
            featuredCourses.map((course, index) => (
              <motion.div
                key={course._id}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))
          )}
        </motion.div>

        {/* View All Courses Button */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <button
            onClick={() => navigate("/search")}
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          >
            <span>View All Courses</span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesSection;
