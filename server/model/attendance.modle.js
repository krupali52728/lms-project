import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Present", "Absent", "Late"],
      default: "Absent",
    },
    markedBy: {
      type: String,
      enum: ["system", "teacher"],
      default: "system",
    },
    remarks: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
