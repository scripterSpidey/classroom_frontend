export const convertToIST= (date:string):string=>{
    const stdTime =  new Date(date).toLocaleString('en-IN',{
        timeZone:'Asia/kolkata',
        hour:'2-digit',
        minute:'2-digit',
        day:'2-digit',
        month:'2-digit',
        year:'numeric',
        hour12:true
    })

    return stdTime
}