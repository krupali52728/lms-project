import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CourseCard from './CourseCard';

const CoursesSection = () => {
  const navigate = useNavigate();

  // Sample courses data - in a real app, this would come from your API
  const featuredCourses = [
    {
      id: 1,
      title: 'Complete React Developer Course',
      description: 'Learn React from scratch with practical projects and real-world examples. Master hooks, context, routing and more.',
      instructor: 'John Smith',
      thumbnail: null,
      price: 89.99,
      rating: 4.8,
      students: 2342,
      duration: '12h 30m',
      lessons: 45,
      category: 'Web Development',
      difficulty: 'Intermediate'
    },
    {
      id: 2,
      title: 'Advanced JavaScript Concepts',
      description: 'Master advanced JavaScript concepts including closures, prototypes, async programming and ES6+ features.',
      instructor: 'Sarah Johnson',
      thumbnail: null,
      price: 79.99,
      rating: 4.9,
      students: 1876,
      duration: '8h 45m',
      lessons: 32,
      category: 'Programming',
      difficulty: 'Advanced'
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      description: 'Learn the fundamentals of user interface and user experience design with modern tools and techniques.',
      instructor: 'Mike Chen',
      thumbnail: null,
      price: 69.99,
      rating: 4.7,
      students: 1543,
      duration: '6h 15m',
      lessons: 28,
      category: 'Design',
      difficulty: 'Beginner'
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      description: 'Learn the fundamentals of user interface and user experience design with modern tools and techniques.',
      instructor: 'Mike Chen',
      thumbnail: null,
      price: 69.99,
      rating: 4.7,
      students: 1543,
      duration: '6h 15m',
      lessons: 28,
      category: 'Design',
      difficulty: 'Beginner'
    },{
      id: 3,
      title: 'UI/UX Design Fundamentals',
      description: 'Learn the fundamentals of user interface and user experience design with modern tools and techniques.',
      instructor: 'Mike Chen',
      thumbnail: null,
      price: 69.99,
      rating: 4.7,
      students: 1543,
      duration: '6h 15m',
      lessons: 28,
      category: 'Design',
      difficulty: 'Beginner'
    },{
      id: 3,
      title: 'UI/UX Design Fundamentals',
      description: 'Learn the fundamentals of user interface and user experience design with modern tools and techniques.',
      instructor: 'Mike Chen',
      thumbnail: null,
      price: 69.99,
      rating: 4.7,
      students: 1543,
      duration: '6h 15m',
      lessons: 28,
      category: 'Design',
      difficulty: 'Beginner'
    },{
      id: 3,
      title: 'UI/UX Design Fundamentals',
      description: 'Learn the fundamentals of user interface and user experience design with modern tools and techniques.',
      instructor: 'Mike Chen',
      thumbnail: null,
      price: 69.99,
      rating: 4.7,
      students: 1543,
      duration: '6h 15m',
      lessons: 28,
      category: 'Design',
      difficulty: 'Beginner'
    },
    
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
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
            Discover our most popular courses designed by industry experts to help you master new skills and advance your career
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
          {featuredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
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
            onClick={() => navigate('/search')}
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
