export const convertToIST= (date:string):string=>{
    const stdTime =  new Date(date).toLocaleString('en-IN',{
        timeZone:'Asia/kolkata',
        hour:'2-digit',
        minute:'2-digit',
        day:'2-digit',
        month:'2-digit',
        year:'numeric',
        weekday:'long',
        hour12:true
    })

    return stdTime
}

export const ReadableDate = (date:string):string=>{
   
    const formattedDate = new Date(date).toLocaleDateString('en-IN',{
        timeZone:'Asia/kolkata',
        month:'short',
        day:'numeric',
        year:'numeric'
    })
    const [day,month,year] = formattedDate.split(' ');
    return `${month}-${day}, ${year}`
}

export const convertToMilliseconds = (fullDate:string)=>{
    const [day,date,time] = fullDate.split(', ')
    console.log(day,date,time)
}