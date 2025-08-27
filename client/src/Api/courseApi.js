import api from './config.js';

// create a course
export const createCourse = async (courseData)=>{
    try {
        const res = await api.post('/course/create', courseData);
        return res.data;
    } catch (error) {
        console.log("Create course error:", error.response?.data || error.message);
        throw error.response?.data || { message: "Something went wrong" };
    }

}

// get allcourse
export const getAllCourses = async()=>{
    try {
        const res = await api.get('/course/all');
        return res.data;
    } catch (error) {
        console.log("Get all courses error:", error.response?.data || error.message);
        throw error.response?.data || { message: "Something went wrong" };
    }
}

// get single course by ID
export const getCourseById = async(courseId)=>{
    try {
        const res = await api.get(`/course/${courseId}`);
        return res.data;
    } catch (error) {
        console.log("Get course by ID error:", error.response?.data || error.message);
        throw error.response?.data || { message: "Something went wrong" };
    }
}

// delete a course
export const deleteCourse = async (courseId) =>{
    try {
        const res = await api.delete(`/course/${courseId}`);
        return res.data;
    } catch (error) {
        console.log("Delete course error:", error.response?.data || error.message);
        throw error.response?.data || { message: "Something went wrong" };
    }
}

//enroll a in a course
export const enrollInCourse = async(courseId) =>{
    try {
        const res = await api.post(`/course/enroll/${courseId}`);
        return res.data;
    } catch (error) {
        console.log("Enroll in course error:", error.response?.data || error.message);
        throw error.response?.data || { message: "Something went wrong" };
    }
}

//toggle course 
export const toggleCourse = async(courseId) =>{
    try {
        const res = await api.patch(`/course/${courseId}/toggle-publish`);
        return res.data;
    } catch (error) {
        console.log("Toggle course error:", error.response?.data || error.message);
        throw error.response?.data || { message: "Something went wrong" };
    }
}

// get educator's courses
export const getEducatorCourses = async() => {
    try {
        const res = await api.get('/course/my-courses');
        return res.data;
    } catch (error) {
        console.log("Get educator courses error:", error.response?.data || error.message);
        throw error.response?.data || { message: "Something went wrong" };
    }
}

// check if user has already purchased a course
export const checkPurchaseStatus = async(courseId) => {
    try {
        const res = await api.get(`/course/${courseId}/purchase-status`);
        return res.data;
    } catch (error) {
        console.log("Check purchase status error:", error.response?.data || error.message);
        throw error.response?.data || { message: "Something went wrong" };
    }
}