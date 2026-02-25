import React, { useEffect, useState } from "react";

const AttendanceReport = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/attendance/student", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setAttendance(data));
  }, []);

  return (
    <div>
      <h2>Attendance Report</h2>
    </div>
  );
};

export default AttendanceReport;   // ✅ VERY IMPORTANT