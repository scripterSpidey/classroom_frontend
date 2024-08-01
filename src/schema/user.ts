
import { ClassroomType } from "../pages/Dashboard"
export interface User{
    email:string,
    name:string,
    id:string,
    profile_image?:string,
    classrooms?:ClassroomType[]
}




