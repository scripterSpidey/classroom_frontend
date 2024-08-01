import { AxiosResponse } from "axios";
import axiosreq from "../axios.config";
import { studentClassroonEndpoints, teacherClassroomEndpoints } from "../endpoints";


type CreateClassroomInput ={
    name:string,
    subject:string,
    class_teacher_id:string|undefined,
    class_teacher_name:string|undefined,
    purpose:string
}

export const createClassroom = async(data:CreateClassroomInput)=>{
    try {
        const response = await axiosreq.post(teacherClassroomEndpoints.create,data)
        return response.data;
    } catch (error) {
        throw error
    }

}

export const getTeacherClassrooms = async(data:string):Promise<any>=>{
    try {
        const response =  await axiosreq.get(teacherClassroomEndpoints.allClassrooms(data))
        return response.data;
    } catch (error) {
        throw error
    }
}

export const getStudentClassrooms = async()=>{
    try {
        const response =  await axiosreq.get(studentClassroonEndpoints.allClassrooms);
        return response.data;
    } catch (error) {
        throw error;
    }
} 

export const fetchClassroomDetailsForTeacher = async (classroom_id:string)=>{
    try {
        console.log('fetching data')
        const response = await axiosreq.get(teacherClassroomEndpoints.classroom(classroom_id));
        return  response.data;
    } catch (error) {
        throw error
    }
}

export const searchClassroomForStudent = async (classroom_id:string)=>{
    try {
        const response = await axiosreq.get(studentClassroonEndpoints.classroomDetails(classroom_id));
        console.log('response: ',response)
        return  response.data;
    } catch (error) {
        throw error
    }
}

export const findClassroomForStudent = async (classroom_id:string):Promise<any>=>{
    try {
        const response = await axiosreq.get(studentClassroonEndpoints.searchClassroom(classroom_id));
        return response.data
    } catch (error) {
        throw error
    }
}

export const studentRequestToJoinClassroom = async (classroom_id:string):Promise<AxiosResponse> =>{
    try {
        const response = await axiosreq.post(studentClassroonEndpoints.requestToJoinClassroom(classroom_id));
        return response
    } catch (error) {
        throw error
    }
}

export const acceptJoiningRequest = async (classroom_id:string,data:object)=>{
    try {
        const response = await axiosreq.patch(teacherClassroomEndpoints.acceptRequest(classroom_id),data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const rejectJoiningRequest = async (classroom_id:string,body:object)=>{
    try {
        const response = await axiosreq.patch(teacherClassroomEndpoints.rejectRequest(classroom_id),body);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const fetchClassroomDetailsForStudent = async (classroom_id:string)=>{
    try {
        const response = await axiosreq.get(studentClassroonEndpoints.classroomDetails(classroom_id));
        
        return response.data;
    } catch (error) {
        throw error
    }
}