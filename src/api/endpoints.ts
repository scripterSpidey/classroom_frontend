export const studentEndpoints = {
    authenticate:'student/auth',
    register: "student/register",
    verify: "student/verify",
    login:"student/login",
    logout:"student/logout",
    resendOTP:"student/resend_otp",
    googleLogin:"student/google_login"
}

export const teacherEndpoints={
    authenticate:'teacher/auth',
    register: "teacher/register",
    verify: "teacher/verify",
    login:"teacher/login",
    logout:"teacher/logout",
    resendOTP:"teacher/resend_otp",
    googleLogin:"teacher/google_login"
}

export const teacherClassroomEndpoints={
    create:`teacher/classroom`,
    allClassrooms:(class_teacher_id:string):string=>`teacher/classrooms/${class_teacher_id}`,
    classroom:(classroom_id:string):string =>`teacher/classroom/${classroom_id}`,
    acceptRequest:(classroom_id:string):string=>`teacher/classroom/${classroom_id}/requests/accept`,
    rejectRequest:(classroom_id:string):string=>`teacher/classroom/${classroom_id}/requests/reject`,
}

export const studentClassroonEndpoints = {
    allClassrooms:`student/classrooms`,
    searchClassroom:(classroom_id:string):any=>`student/classroom/search/${classroom_id}`,
    requestToJoinClassroom:(classroom_id:string):any=>`student/classroom/search/${classroom_id}`,
    classroomDetails:(classroom_id:string)=>`student/classroom/${classroom_id}`,
   
}
 
