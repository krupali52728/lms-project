import { useState, useEffect } from "react";

const ViewAttendance = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    // TEMP DATA (backend baad me)
    setAttendance([
      { _id: "1", date: "2025-02-01", status: "Present", remarks: "On time" },
      { _id: "2", date: "2025-02-02", status: "Absent", remarks: "" },
      { _id: "3", date: "2025-02-03", status: "Late", remarks: "Traffic" },
    ]);
  }, []);

  const statusColors = {
    Present: "bg-green-500/20 text-green-400",
    Absent: "bg-red-500/20 text-red-400",
    Late: "bg-yellow-500/20 text-yellow-400",
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-white">
      {/* Page Title */}
  
 {/* HEADER – yahi tumhara code jayega */}
      
        <div className="bg-slate-950 px-6 pt-10 pb-4">

        <h1 className="text-3xl font-bold text-white">Attendance</h1>
        <p className="text-gray-400 mt-1">
          Track your attendance record
        </p>
      </div>
      {/* Card */}
      <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-slate-700">
              <th className="py-3">Date</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((item) => (
              <tr
                key={item._id}
                className="border-b border-slate-800 hover:bg-slate-800/40"
              >
                <td className="py-4">
                  {new Date(item.date).toLocaleDateString("en-IN")}
                </td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="text-gray-400">
                  {item.remarks || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Progress */}
        <div className="mt-6">
          <p className="text-sm text-gray-400 mb-2">
            Overall Attendance
          </p>
          <div className="h-3 bg-slate-800 rounded-full">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{
                width: `${
                  (attendance.filter(
                    (a) => a.status === "Present" || a.status === "Late"
                  ).length /
                    attendance.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAttendance;
