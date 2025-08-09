
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-b from-black via-black to-[#0a1128]">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center w-full space-y-8 text-center">
          
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight">
            Empower your <span className="text-blue-500">Learning Experience</span> with Courses Designed to <span className="text-blue-500">Fit Your Choice</span>
          </h1>

          {/* Description - Responsive for all devices */}
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            We bring together world-class instructors, interactive content, and a supportive 
            community of learners to help you achieve your goals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link to="/courses" className="btn btn-primary text-lg px-8 py-3">
              Explore Courses
            </Link>
            <Link to="/register" className="btn btn-outline text-lg px-8 py-3">
              Join Now
            </Link>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-4xl">
            <div className="bg-black/30 p-6 rounded-xl backdrop-blur-sm border border-blue-500/20">
              <h3 className="text-3xl font-bold text-blue-400">500+</h3>
              <p className="text-gray-300">Courses Available</p>
            </div>
            <div className="bg-black/30 p-6 rounded-xl backdrop-blur-sm border border-blue-500/20">
              <h3 className="text-3xl font-bold text-blue-400">50K+</h3>
              <p className="text-gray-300">Active Students</p>
            </div>
            <div className="bg-black/30 p-6 rounded-xl backdrop-blur-sm border border-blue-500/20">
              <h3 className="text-3xl font-bold text-blue-400">200+</h3>
              <p className="text-gray-300">Expert Instructors</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
