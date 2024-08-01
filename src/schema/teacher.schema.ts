import { ClassroomSchema } from "./classroom.schema";

export interface TeacherSchema{
    _id:string,
    email:string,
    name:string,
    blocked:boolean,
    verified:boolean,
    classrooms:ClassroomSchema[],
    profile_image:string | null
}