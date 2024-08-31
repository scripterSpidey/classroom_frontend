import { AxiosResponse } from "axios";
import axiosreq from "../axios.config";
import { studentClassroonEndpoints } from "../endpoints";
import { PrivateChatSchema } from "../../schema/private.chats.schema";
import { ClassroomMaterialType } from "../../schema/classroom.schema";
import { WorksSchema, WorkSubmissionType } from "../../schema/works.schema";
import { ExamsSchema } from "../../schema/exams.schema";


export const getStudentClassrooms = async()=>{
    try {
        const response =  await axiosreq.get(studentClassroonEndpoints.allClassrooms);
        return response.data;
    } catch (error) {
        throw error;
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


export const fetchClassroomDetailsForStudent = async (classroom_id:string)=>{
    try {
        const response = await axiosreq.get(studentClassroonEndpoints.classroomDetails(classroom_id));
        
        return response.data;
    } catch (error) {
        throw error
    }
}



export const  getMessagesForStudent = async ()=>{
    try {
        const response = await axiosreq.get(studentClassroonEndpoints.chatEndpoint);
        return response.data
    } catch (error) {
        throw error
    }
}


export const sendMessagesForStudent = async(data:{message:string})=>{
    try {
        await axiosreq.post(studentClassroonEndpoints.chatEndpoint,data)
    } catch (error) {
        throw error
    }
}

type SendPrivateMessageBodyType ={
    message:string,
    receiverName:string
}

export const sendPrivateMessageForStudent = async(receiverId:string,body:SendPrivateMessageBodyType)=>{
    try {
        await axiosreq.post(studentClassroonEndpoints.privateChat(receiverId),body)
    } catch (error) {
        throw error
    }
}

export const getPrivateMessagesForStudent = async(receiverId:string):Promise<PrivateChatSchema[]>=>{
    try {
        const response = await axiosreq.get(studentClassroonEndpoints.privateChat(receiverId));
        return response.data;
    } catch (error) {
        throw error
    }
}

export const getMaterialsForStudent = async():Promise<ClassroomMaterialType[]>=>{
    try {
        const response = await axiosreq.get(studentClassroonEndpoints.materials);
        return response.data;
    } catch (error) {
        throw error
    }
}

export const getAllWorksForStudent = async():Promise<WorksSchema[]>=>{
    try {
        const response = await axiosreq.get(studentClassroonEndpoints.works);
        return response.data;
    } catch (error) {
        throw error
    }
}

export const submitWork = async(workId:string,data:FormData):Promise<WorkSubmissionType[]>=>{
    try {
        const response = await axiosreq.post(studentClassroonEndpoints.work(workId),data);
        return response.data;
    } catch (error) {
        throw error
    }
}

export const getAllExamsForStudent = async ():Promise<ExamsSchema[]>=>{
    try {
        const response = await axiosreq.get(studentClassroonEndpoints.exams);
        return response.data;
    } catch (error) {
        throw error
    }
}
