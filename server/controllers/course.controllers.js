import Course from "../model/course.model.js";
import Chapter from "../model/chapter.model.js";
import Lecture from "../model/lecture.model.js";
import User from "../model/user.model.js";
import Purchase from "../model/purchase.model.js";


//create course
export const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      discount,
      thumbnail,
      totalDuration,
      chapters,
    } = req.body;
    const { userId } = req.user;

    const educator = await User.findById(userId);
    if (!educator || educator.role !== "educator") {
      return res
        .status(403)
        .json({ success: false, message: "Only educators can create courses" });
    }

    // Create the course
    const course = new Course({
      title,
      description,
      price,
      discount: discount || 0,
      thumbnail,
      educator: userId,
      totalDuration,
      chapters: [],
    });

    await course.save();
    res.status(201).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get all course
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .populate("educator", "name email avatar")
      .populate("chapters")
      .sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//delete the course

export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.user;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Debug: Log the values being compared
    // console.log('User ID from token:', userId);
    // console.log('User ID type:', typeof userId);
    // console.log('Course educator ID:', course.educator);
    // console.log('Course educator ID type:', typeof course.educator);
    // console.log('Course educator toString():', course.educator.toString());
    // console.log('Are they equal?:', course.educator.toString() === userId.toString());

    // Check if user is the educator of this course
    if (course.educator.toString() !== userId.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: "You are not authorized to delete this course" 
      });
    }

    // Delete related chapters and lectures
    await Chapter.deleteMany({ course: courseId });
    await Lecture.deleteMany({ course: courseId });
    await Course.findByIdAndDelete(courseId);

    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Enroll student in course
export const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.user;

    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    if (user.role !== "student" && user.role !== "educator") {
      return res
        .status(403)
        .json({
          success: false,
          message: "Only students can enroll in courses",
        });
    }

    // Check if already enrolled
    if (course.enrolledStudents.includes(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Already enrolled in this course" });
    }

    // Add student to course
    await course.save();

    // Add course to user's enrolled courses
    user.enrolledCourse.push(courseId);
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Successfully enrolled in course" });
  } catch (error) {
    res.status(500).json({ success: false, message:error.message });
  }
};

// get course by educator
export const getCourseEducator = async (req, res) => {
  try {
    const { userId } = req.user;

    const courses = await Course.find({ educator: userId })
      .populate("chapters")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single course by ID
export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId)
      .populate("educator", "name email avatar")
      .populate({
        path: "chapters",
        populate: {
          path: "chapterContent",
          model: "Lecture"
        }
      });

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }


    res.status(200).json({ success: true, course });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Publish/Unpublish course
export const togglePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.user;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Debug: Log the values being compared
    // console.log('User ID from token:', userId);
    // console.log('Course educator ID:', course.educator.toString());
    // console.log('User role:', req.user.role);

    if (course.educator.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    course.isPublished = !course.isPublished;
    await course.save();

    res.status(200).json({ 
      success: true, 
      message: `Course ${course.isPublished ? 'published' : 'unpublished'} successfully`,
      course 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Check if user has already purchased a course
export const checkPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.user;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    // Check if already purchased/enrolled
    const existingPurchase = await Purchase.findOne({
      user: userId,
      course: courseId
    });

    const isEnrolled = user.enrolledCourse.includes(courseId);
    const hasPurchased = existingPurchase !== null;

    res.status(200).json({
      success: true,
      data: {
        courseId,
        userId,
        hasPurchased,
        isEnrolled,
        canPurchase: !hasPurchased && !isEnrolled,
        purchaseDate: existingPurchase?.purchaseDate || null
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//update course 

export const updateCourse = async (req, res) => {
  try {
    const {courseId} = req.params;
    const {title, description, category, price, difficulty, duration, thumbnail, tags, requirements, objectives, isPublished, status} = req.body;

    // Validate request body
    

    // Find course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Update course fields
    course.title = title;
    course.description = description;
    course.category = category;
    course.price = price;
    course.difficulty = difficulty;
    course.duration = duration;
    course.thumbnail = thumbnail;
    course.tags = tags;
    course.requirements = requirements;
    course.objectives = objectives;
    course.isPublished = isPublished;
    course.status = status;

    await course.save();

    res.status(200).json({ success: true, message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}