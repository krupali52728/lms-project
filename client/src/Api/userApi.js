import api from './config.js';

//  Get User Profile
export const getUserProfile = async () => {
  try {
    const res = await api.get("/user/profile");
    return res.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error; // rethrow so UI can handle it
  }
};

//  Purchase a Course
export const purchaseCourse = async (courseId) => {
  try {
    const res = await api.post(`/user/purchase/${courseId}`);
    return res.data;
  } catch (error) {
    console.error(`Error purchasing course ${courseId}:`, error);
    throw error;
  }
};

//  Update Course Progress
export const updateCourseProgress = async (courseId, progressData) => {
  try {
    const res = await api.put(`/user/progress/${courseId}`, progressData);
    return res.data;
  } catch (error) {
    console.error(`Error updating progress for course ${courseId}:`, error);
    throw error;
  }
};

//  Get Course Progress
export const getCourseProgress = async (courseId) => {
  try {
    const res = await api.get(`/user/progress/${courseId}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching progress for course ${courseId}:`, error);
    throw error;
  }
};

//  Rate Course
export const rateCourse = async (courseId, ratingData) => {
  try {
    const res = await api.post(`/user/rating/${courseId}`, ratingData);
    return res.data;
  } catch (error) {
    console.error(`Error rating course ${courseId}:`, error);
    throw error;
  }
};
