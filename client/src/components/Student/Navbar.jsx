import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md z-50 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          Learn<span className="text-blue-500">Smart</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-white hover:text-blue-400 transition">Home</Link>
          <Link to="/courses" className="text-white hover:text-blue-400 transition">Courses</Link>
          <Link to="/about" className="text-white hover:text-blue-400 transition">About</Link>
          <Link to="/contact" className="text-white hover:text-blue-400 transition">Contact</Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-white hover:text-blue-400 transition">Login</Link>
          <Link to="/register" className="btn btn-primary">Sign Up</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 py-4">
          <div className="container mx-auto flex flex-col gap-4">
            <Link to="/" className="text-white hover:text-blue-400 transition px-4 py-2">Home</Link>
            <Link to="/courses" className="text-white hover:text-blue-400 transition px-4 py-2">Courses</Link>
            <Link to="/about" className="text-white hover:text-blue-400 transition px-4 py-2">About</Link>
            <Link to="/contact" className="text-white hover:text-blue-400 transition px-4 py-2">Contact</Link>
            
            <div className="flex flex-col gap-2 mt-4 px-4">
              <Link to="/login" className="text-white hover:text-blue-400 transition py-2">Login</Link>
              <Link to="/register" className="btn btn-primary text-center">Sign Up</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar