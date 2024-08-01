import axiosreq from "../axios.config"
import { studentEndpoints, teacherEndpoints } from "../endpoints";

export const authenticateUser = async  (role:string)=>{
    try {
        const url = role =='teacher' ? teacherEndpoints.authenticate : studentEndpoints.authenticate;
        const response = await axiosreq.get(url);
       
        return response.data;
    } catch (error) {
        throw error;
    }
}