import axiosreq from "../axios.config";
import { adminEndpoints } from "../endpoints";

const admin = {

    login: async (body: { email: string, password: string }) => {
        try {
            const response = await axiosreq.post(adminEndpoints.login, body)
        } catch (error) {
            throw error
        }
    },

    logout: async () => {
        try {
            const response = await axiosreq.post(adminEndpoints.logout)
        } catch (error) {
            throw error
        }
    },

    classrooms: async () => {
        try {
            const response = await axiosreq.get(adminEndpoints.classrooms);
            return response.data;
        } catch (error) {
            throw error
        }
    },

    teachers: async () => {
        try {
            const response = await axiosreq.get(adminEndpoints.teachers);
            return response.data;
        } catch (error) {
            throw error
        }
    },

    students: async () => {
        try {
            const response = await axiosreq.get(adminEndpoints.students);
            return response.data;
        } catch (error) {
            throw error
        }
    },

    fetchTeacherInfo: async (teacherId:string)=>{
        try {
            const response = await axiosreq.get(adminEndpoints.teacher(teacherId));
            return response.data;
        } catch (error) {
            throw error;
        }
    } ,
    fetchStudentInfo: async (studentId:string)=>{
        try {
            const response = await axiosreq.get(adminEndpoints.student(studentId));
            return response.data;

        } catch (error) {
            throw error;
        }
    } ,
    fetchClassroomInfo: async (classroomId:string)=>{
        try {
            const response = await axiosreq.get(adminEndpoints.classroom(classroomId));
            return response.data;

        } catch (error) {
            throw error;
        }
    } 
}

export default admin;