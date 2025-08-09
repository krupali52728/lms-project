import React from 'react';
import Hero from '../components/Student/Hero';
import Navbar from '../components/Student/Navbar';
import Footer from '../components/Student/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />

      <main className="flex-grow">
        <Hero />

        {/* Features Section */}
        <section className="py-16 bg-gradient-to-b from-slate-950 to-[#0a1128]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Our Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-12">
              Discover the unique features that make our platform the best choice for learners worldwide.
            </p>
            {/* Add feature cards here */}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">What Our Students Say</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-12">
              Hear from our students about their learning experiences and success stories.
            </p>
            {/* Add testimonials here */}
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-16 bg-gradient-to-b from-[#0a1128] to-slate-950">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Explore Our Courses</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-12">
              Browse our extensive catalog of courses designed to help you achieve your goals.
            </p>
            {/* Add course cards here */}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;