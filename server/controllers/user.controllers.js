import User from "../model/user.model.js";

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