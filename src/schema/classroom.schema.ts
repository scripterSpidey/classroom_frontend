import { StudentSchema } from "./student.schema"

export interface ClassroomSchema{
    _id:string,
    name:string,
    subject:string,
    class_teacher_name:string,
    class_teacher_id:string,
    students:StudentSchema[],
    strength:number,
    joining_requests:StudentSchema[],
    banned:boolean,
    classroom_id:string
}