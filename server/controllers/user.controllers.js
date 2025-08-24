import User from "../model/user.model.js";
import Course from "../model/course.model.js";
import userCourseProgress from "../model/courseProgress.model.js";
import Purchase from "../model/purchase.model.js";

// Get user profile data
export const getUserData = async (req, res) => {
  try {
    const { userId } = req.user;
    
    const user = await User.findById(userId)
      .select('-password')
      .populate('enrolledCourse', 'title thumbnail price educator');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      user 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

//user enrollCourse
export const userEnrollCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.user;

    // Check if user exists and is a student
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.role !== 'student') {
      return res.status(403).json({
        success: false,
        message: "Only students can enroll in courses"
      });
    }

    // Check if course exists and is published
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    if (!course.isPublished) {
      return res.status(400).json({
        success: false,
        message: "Course is not available for enrollment"
      });
    }

    // Check if already enrolled
    if (user.enrolledCourse.includes(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Already enrolled in this course"
      });
    }

    if (course.enrolledStudents.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "Already enrolled in this course"
      });
    }

    // Enroll user in course
    user.enrolledCourse.push(courseId);
    course.enrolledStudents.push(userId);

    await user.save();
    await course.save();

    res.status(200).json({
      success: true,
      message: "Successfully enrolled in course",
      course: {
        _id: course._id,
        title: course.title,
        thumbnail: course.thumbnail,
        price: course.price
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//user purshase course 
export const userPurchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.user;
    const { sessionId, paymentMethod = 'stripe' } = req.body;

    // console.log('Processing purchase for user:', userId, 'course:', courseId);

    // Check if user exists and is a student
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.role !== 'student') {
      return res.status(403).json({
        success: false,
        message: "Only students can purchase courses"
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId).populate('educator', 'name email');
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    if (!course.isPublished) {
      return res.status(400).json({
        success: false,
        message: "Course is not available for purchase"
      });
    }

    // Check if already purchased/enrolled
    const existingPurchase = await Purchase.findOne({
      user: userId,
      course: courseId
    });

    if (existingPurchase || user.enrolledCourse.includes(courseId)) {
      console.log('User already purchased this course');
      return res.status(400).json({
        success: false,
        message: "Course already purchased"
      });
    }

    // Calculate final price after discount
    const finalPrice = course.price - (course.price * (course.discount || 0) / 100);
    
    // console.log('Course price:', course.price, 'Final price after discount:', finalPrice);

    // Create purchase record in database
    const purchase = new Purchase({
      user: userId,
      course: courseId,
      price: finalPrice,
      purchaseDate: new Date()
    });

    await purchase.save();
    // console.log('Purchase record saved:', purchase._id);

    // Enroll user in course
    user.enrolledCourse.push(courseId);
    course.enrolledStudents.push(userId);

    await user.save();
    await course.save();
    
    console.log('User enrolled in course successfully');

    res.status(200).json({
      success: true,
      message: "Course purchased and enrolled successfully",
      purchase: {
        _id: purchase._id,
        course: {
          _id: course._id,
          title: course.title,
          educator: course.educator.name,
          originalPrice: course.price,
          discount: course.discount || 0,
          finalPrice: finalPrice
        },
        paymentMethod,
        purchaseDate: purchase.purchaseDate
      }
    });
  } catch (error) {
    console.error('Purchase error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// uodate UserCourseProgress
export const updateUserCourseProgress = async (req, res) =>{
  try {
    const { courseId } = req.params;
    const { userId } = req.user;
    const { completed, progress } = req.body;

    // Check if user is enrolled in the course
    const user = await User.findById(userId);
    if (!user || !user.enrolledCourse.includes(courseId)) {
      return res.status(403).json({
        success: false,
        message: "Not enrolled in this course"
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

    // Find existing progress or create new one
    let courseProgress = await userCourseProgress.findOne({
      userId: userId,
      courseId: courseId
    });

    if (courseProgress) {
      // Update existing progress
      courseProgress.completed = completed !== undefined ? completed : courseProgress.completed;
      courseProgress.progress = progress !== undefined ? progress : courseProgress.progress;
      await courseProgress.save();
    } else {
      // Create new progress record
      courseProgress = new userCourseProgress({
        userId: userId,
        courseId: courseId,
        completed: completed || false,
        progress: progress || 0
      });
      await courseProgress.save();
    }

    res.status(200).json({
      success: true,
      message: "Course progress updated successfully",
      courseProgress
    });
  } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
  }
}

// get userCourseProgress
export const getUserCourseProgress = async(req,res)=>{
  try {
    const { courseId } = req.params;
    const { userId } = req.user;

    // Check if user is enrolled in the course
    const user = await User.findById(userId);
    if (!user || !user.enrolledCourse.includes(courseId)) {
      return res.status(403).json({
        success: false,
        message: "Not enrolled in this course"
      });
    }

    // Find user's progress for the course
    const courseProgress = await userCourseProgress.findOne({
      userId: userId,
      courseId: courseId
    }).populate('courseId', 'title totalDuration');

    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "No progress found for this course"
      });
    }

    res.status(200).json({
      success: true,
      courseProgress
    });
  } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
  }
}

// addUserRating
export const userRating = async(req,res) =>{
  try {
    const { courseId } = req.params;
    const { userId } = req.user;
    const { rating, review } = req.body;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5"
      });
    }

    // Check if user is enrolled in the course
    const user = await User.findById(userId);
    if (!user || !user.enrolledCourse.includes(courseId)) {
      return res.status(403).json({
        success: false,
        message: "You must be enrolled in this course to rate it"
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    // Check if user already rated this course
    const existingRatingIndex = course.ratings.findIndex(r => r.user.toString() === userId);
    
    if (existingRatingIndex !== -1) {
      // Update existing rating
      course.ratings[existingRatingIndex].rating = rating;
      course.ratings[existingRatingIndex].review = review || course.ratings[existingRatingIndex].review;
      course.ratings[existingRatingIndex].createdAt = new Date();
    } else {
      // Add new rating
      course.ratings.push({
        user: userId,
        rating,
        review: review || "",
        createdAt: new Date()
      });
    }

    await course.save();

    // Calculate average rating
    const totalRatings = course.ratings.length;
    const averageRating = course.ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings;

    res.status(200).json({
      success: true,
      message: existingRatingIndex !== -1 ? "Rating updated successfully" : "Rating added successfully",
      rating: {
        userRating: rating,
        userReview: review,
        averageRating: averageRating.toFixed(1),
        totalRatings
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });    
  } 
}

// Check if user has purchased a course
export const checkCoursePurchase = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.user;


    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if user is enrolled
    const isEnrolled = user.enrolledCourse.includes(courseId);
    
    // Check if there's a purchase record
    const purchase = await Purchase.findOne({
      user: userId,
      course: courseId
    }).populate('course', 'title price');


    res.status(200).json({
      success: true,
      isEnrolled,
      hasPurchased: !!purchase,
      purchase: purchase || null
    });
  } catch (error) {
    console.error('Check purchase error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}