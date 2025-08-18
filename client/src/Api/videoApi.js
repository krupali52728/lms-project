import api from './config.js';

// Video API functions
export const uploadVideo = async (videoFile) => {
  const formData = new FormData();
  formData.append('video', videoFile);
  
  const res = await api.post("/video/upload", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};