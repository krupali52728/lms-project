import api from './config.js';

// all are access 

export const getPublicCourses = async () => {
  const response = await api.get('/course/public');
  return response.data;
};
