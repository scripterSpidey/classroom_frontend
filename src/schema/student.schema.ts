import { ClassroomSchema } from "./classroom.schema";

export interface StudentSchema{
    _id: string;
    email: string,
    name: string,
    createdAt: Date,
    updateAt: Date,
    blocked:boolean,
    verified:boolean,
    classrooms:ClassroomSchema[],
    profile_image: string
}