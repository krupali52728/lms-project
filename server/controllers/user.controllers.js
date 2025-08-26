import User from "../model/user.model.js";
import Course from "../model/course.model.js";
import userCourseProgress from "../model/courseProgress.model.js";
import Purchase from "../model/purchase.model.js";
import { uploadProfilePictureToCloudinary } from "../config/multer.js";

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

    // Format the user data for the frontend
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || null,
      phone: user.phone || '',
      location: user.location || '',
      bio: user.bio || '',
      birthDate: user.birthDate ? user.birthDate.toISOString().split('T')[0] : '', // Format as YYYY-MM-DD
      enrolledCourse: user.enrolledCourse,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.status(200).json({ 
      success: true, 
      user: userData 
    });
  } catch (error) {
    console.error('Get user data error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
export const updateUserData = async(req,res)=>{
  try {
    const { userId } = req.user;
    const { 
      name, 
      phone, 
      location, 
      bio, 
      birthDate,
      avatar 
    } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Prepare update object - only include fields that are provided
    const updateData = {};
    
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (location !== undefined) updateData.location = location;
    if (bio !== undefined) updateData.bio = bio;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (birthDate !== undefined) {
      // Validate date format if provided
      if (birthDate && !isNaN(new Date(birthDate).getTime())) {
        updateData.birthDate = new Date(birthDate);
      } else if (birthDate) {
        return res.status(400).json({
          success: false,
          message: "Invalid birth date format"
        });
      }
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { 
        new: true, 
        runValidators: true,
        select: '-password' // Exclude password from response
      }
    ).populate('enrolledCourse', 'title thumbnail price educator');

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error('Update user data error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// Upload profile picture
export const uploadProfilePicture = async (req, res) => {
  try {
    const { userId } = req.user;

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Generate unique filename
    const fileName = `profile_${userId}_${Date.now()}`;

    try {
      // Upload to Cloudinary
      const uploadResult = await uploadProfilePictureToCloudinary(req.file.buffer, fileName);
      
      // Update user avatar URL
      user.avatar = uploadResult.secure_url;
      await user.save();

      res.status(200).json({
        success: true,
        message: "Profile picture uploaded successfully",
        avatar: uploadResult.secure_url,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar
        }
      });

    } catch (uploadError) {
      console.error('Cloudinary upload error:', uploadError);
      return res.status(500).json({
        success: false,
        message: "Failed to upload image to cloud storage"
      });
    }

  } catch (error) {
    console.error('Upload profile picture error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

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

export const userPurchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.user;
    const { sessionId, paymentMethod = 'stripe' } = req.body;

    // console.log('Processing purchase for user:', userId, 'course:', courseId);

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Allow both students and educators to purchase courses
    if (user.role !== 'student' && user.role !== 'educator') {
      return res.status(403).json({
        success: false,
        message: "Only students and educators can purchase courses"
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

// update UserCourseProgress
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

// Get user's enrolled courses with progress
export const getEnrolledCourses = async (req, res) => {
  try {
    const { userId } = req.user;

    // Get user with enrolled courses
    const user = await User.findById(userId)
      .populate({
        path: 'enrolledCourse',
        select: 'title thumbnail price educator category difficulty rating createdAt chapters',
        populate: {
          path: 'educator',
          select: 'name'
        }
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Get progress for each enrolled course
    const coursesWithProgress = await Promise.all(
      user.enrolledCourse.map(async (course) => {
        const progress = await userCourseProgress.findOne({
          userId,
          courseId: course._id
        });

        // Calculate total lessons (chapters)
        const totalLessons = course.chapters ? course.chapters.length : 0;
        const progressPercent = progress ? progress.progress : 0;
        const completedLessons = Math.floor((progressPercent / 100) * totalLessons);

        return {
          id: course._id,
          title: course.title,
          instructor: course.educator ? course.educator.name : 'Unknown',
          thumbnail: course.thumbnail || '/api/placeholder/300/200',
          progress: progressPercent,
          totalLessons,
          completedLessons,
          rating: course.rating || 4.5,
          category: course.category || 'General',
          difficulty: course.difficulty || 'Beginner',
          lastAccessed: progress ? progress.updatedAt : course.createdAt,
          isCompleted: progress ? progress.completed : false
        };
      })
    );

    res.status(200).json({
      success: true,
      courses: coursesWithProgress
    });
  } catch (error) {
    console.error('Get enrolled courses error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get user stats
export const getUserStats = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId).populate('enrolledCourse');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Get all progress records for user
    const progressRecords = await userCourseProgress.find({ userId });
    
    // Calculate stats
    const totalEnrolled = user.enrolledCourse.length;
    const completedCourses = progressRecords.filter(p => p.completed).length;
    
 

    res.status(200).json({
      success: true,
      stats: {
        enrolledCourses: totalEnrolled,
        completedCourses,
        
      }
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};