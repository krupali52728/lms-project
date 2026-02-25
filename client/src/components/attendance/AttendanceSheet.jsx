import React from 'react';

const AttendanceSheet = ({ students, onAttendanceChange, onSubmit, loading }) => {
  const statusOptions = ['Present', 'Absent', 'Late'];
  const statusColors = {
    Present: 'bg-green-100 text-green-800',
    Absent: 'bg-red-100 text-red-800',
    Late: 'bg-yellow-100 text-yellow-800'
  };

  const handleMarkAll = (status) => {
    students.forEach(student => {
      onAttendanceChange(student.studentId, 'status', status);
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Educator Header */}
  <div className="p-4 bg-blue-50 border-b rounded-t-lg">
    <h2 className="text-lg font-semibold text-blue-800">
      Educator: Mark & Track Student Attendance
    </h2>
  </div>

      {/* Quick Actions */}
      <div className="p-4 bg-gray-50 border-b flex gap-3">
        <span className="text-sm font-semibold text-gray-700 mr-2">Quick Mark:</span>
        <button
          onClick={() => handleMarkAll('Present')}
          className="px-4 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
        >
          Mark All Present
        </button>
        <button
          onClick={() => handleMarkAll('Absent')}
          className="px-4 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
        >
          Mark All Absent
        </button>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student, index) => (
              <tr key={student.studentId} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {student.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {student.email}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={student.status}
                    onChange={(e) =>
                      onAttendanceChange(student.studentId, 'status', e.target.value)
                    }
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      statusColors[student.status]
                    }`}
                  >
                    {statusOptions.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={student.remarks}
                    onChange={(e) =>
                      onAttendanceChange(student.studentId, 'remarks', e.target.value)
                    }
                    placeholder="Optional remarks..."
                    className="w-full px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submit Button */}
      <div className="p-6 bg-gray-50 border-t">
        <button
          onClick={onSubmit}
          disabled={loading || students.length === 0}
          className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Submitting...' : `Submit Attendance (${students.length} students)`}
        </button>
      </div>

      {/* Empty State */}
      {students.length === 0 && (
        <div className="p-12 text-center text-gray-500">
          <div className="text-5xl mb-3">👥</div>
          <p>No students enrolled in this course</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceSheet;