import express from 'express';
import { authenticate, authorize } from '../middleware/authMiddleaare.js';
import { upload, uploadVideoToCloudinary, uploadImageToCloudinary } from '../config/multer.js';

const videoRouter = express.Router();

// Upload video endpoint
videoRouter.post('/upload', authenticate, authorize('educator'), upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No video file provided'
      });
    }

    const fileName = `video_${Date.now()}_${req.file.originalname.split('.')[0]}`;
    
    // Upload to Cloudinary
    const result = await uploadVideoToCloudinary(req.file.buffer, fileName);
    
    res.status(200).json({
      success: true,
      message: 'Video uploaded successfully',
      videoUrl: result.secure_url,
      videoId: result.public_id,
      duration: result.duration
    });
  } catch (error) {
    console.error('Video upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Video upload failed',
      error: error.message
    });
  }
});

// Upload image endpoint (for course thumbnails)
videoRouter.post('/upload-image', authenticate, authorize('educator'), upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    const fileName = `thumbnail_${Date.now()}_${req.file.originalname.split('.')[0]}`;
    
    // Upload to Cloudinary
    const result = await uploadImageToCloudinary(req.file.buffer, fileName);
    
    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: result.secure_url,
      imageId: result.public_id
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Image upload failed',
      error: error.message
    });
  }
});

export default videoRouter;