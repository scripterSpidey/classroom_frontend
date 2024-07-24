import axiosreq from "../axios.config";
import { teacherEndpoints } from "../endpoints";

import { 
    RegisterUserInput,
    VerificationInput,
    LoginInput, 
    LogoutInput,
    ResendOTPType } from "./student.service";


export const registerTeacher = async (user:RegisterUserInput)=>{
    try {
        const response = await axiosreq.post(teacherEndpoints.register,user);
        console.log('from service',response)
        return response.data
        
    } catch (error) {
        throw error
    }
}

export const verifyTeacher = async(data:VerificationInput)=>{
    try {
        const response = await axiosreq.post(teacherEndpoints.verify,data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const loginTeacher = async(data:LoginInput)=>{
    try {
        const response = await axiosreq.post(teacherEndpoints.login,data);
        console.log('login',response)
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const logoutTeacher = async(data:LogoutInput)=>{
    try {
        const response = await axiosreq.post(teacherEndpoints.logout,data);
        return response.data;
    } catch (error) {
        throw error
    }
}

export const teacherResendOTP = async (data:ResendOTPType)=>{
    try {
        const response = await axiosreq.patch(teacherEndpoints.resendOTP,data);
        return response.data
    } catch (error) {
        throw error
    }
   
}