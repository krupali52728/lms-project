import mongoose from "mongoose";

const userCourseProgressSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    progress:{
        type: Number,
        default: 0
    }

    
},{timestamps:true})

const userCourseProgress = mongoose.model('UserCourseProgress', userCourseProgressSchema);
export default userCourseProgress;