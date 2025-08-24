import api from './config.js';

export const createLecture = async (courseId, chapterId, lectureData) => {
  try {
    const res = await api.post(`/lecture/${courseId}/${chapterId}`, lectureData);
    return res.data;
  } catch (error) {
    console.log("Create lecture error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Something went wrong" };
  }
};

export const deleteLecture = async (lectureId) => {
  try {
    const res = await api.delete(`/lecture/${lectureId}`);
    return res.data;
  } catch (error) {
    console.log("Delete lecture error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Something went wrong" };
  }
};

export const reorderLectures = async (chapterId, lectureOrders) => {
  try {
    const res = await api.put(`/lecture/reorder/${chapterId}`, { lectureOrders });
    return res.data;
  } catch (error) {
    console.log("Reorder lectures error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Something went wrong" };
  }
};

export const getLectureById = async (lectureId) => {
  try {
    const res = await api.get(`/lecture/${lectureId}`);
    return res.data;
  } catch (error) {
    console.log("Get lecture by ID error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Something went wrong" };
  }
};

export const getLecturesByChapter = async (chapterId) => {
  try {
    const res = await api.get(`/lecture/chapter/${chapterId}`);
    return res.data;
  } catch (error) {
    console.log("Get lectures by chapter error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Something went wrong" };
  }
};

export const getLecturesByCourse = async (courseId) => {
    try {
        const res = await api.get(`/lecture/course/${courseId}`);
        return res.data;
    } catch (error) {
        console.log("Get lectures by course error:", error.response?.data || error.message);
        throw error.response?.data || { message: "Something went wrong" };
    }
};

export const getLectureWithAccess = async (lectureId) => {
    try {
        const res = await api.get(`/lecture/access/${lectureId}`);
        return res.data;
    } catch (error) {
        console.log("Get lecture with access error:", error.response?.data || error.message);
        throw error.response?.data || { message: "Access denied or lecture not found" };
    }
};