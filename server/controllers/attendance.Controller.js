import Attendance from "../models/Attendance.js";

export const markAttendance = async (req, res) => {
  try {
    const { courseId, status, remarks } = req.body;

    const attendance = await Attendance.create({
      studentId: req.user._id,
      courseId,
      date: new Date(),
      status,
      remarks,
      markedBy: "system",
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
