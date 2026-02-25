import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AttendanceSheet from '../../components/attendance/AttendanceSheet';

const MarkAttendance = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch enrolled students
  useEffect(() => {
    fetchEnrolledStudents();
  }, [courseId]);

  const fetchEnrolledStudents = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/enrollments/course/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        // Transform enrollment data to student list with attendance status
        const studentList = data.enrollments.map(enrollment => ({
          studentId: enrollment.student._id,
          name: enrollment.student.name,
          email: enrollment.student.email,
          status: 'Present', // Default status
          remarks: ''
        }));
        setStudents(studentList);
      }
    } catch (err) {
      setError('Failed to fetch students');
      console.error(err);
    }
  };

  const handleAttendanceChange = (studentId, field, value) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.studentId === studentId
          ? { ...student, [field]: value }
          : student
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/attendance/bulk-mark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          courseId,
          date: selectedDate,
          attendanceData: students
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('✅ Attendance marked successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to mark attendance');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mark Attendance</h1>
          <p className="text-gray-600">Select date and mark attendance for all students</p>
        </div>

        {/* Date Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        {/* Attendance Sheet */}
        <AttendanceSheet
          students={students}
          onAttendanceChange={handleAttendanceChange}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default MarkAttendance;