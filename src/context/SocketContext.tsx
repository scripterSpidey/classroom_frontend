import React, { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from 'socket.io-client'
import { BASE_URL } from "../constants/env";
import useRole from "../hooks/useRole";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";

import { setOnlineUsers } from "../store/slices/socket.slice";
import { addAnnouncementStudent } from "../store/slices/student.classroom.slice";
import { addAnnouncementTeacher } from "../store/slices/teacher.classroom.slice";

interface SocketContextType {
    socket: Socket | null,
    onlineUsers: string[]
}

type SocketContextProviderPropsType = {}

const defaultContextValue: SocketContextType = {
    socket: null,
    onlineUsers: []
};

export const SocketContext = createContext<SocketContextType>(defaultContextValue);

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider: React.FC<SocketContextProviderPropsType> = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const dispatch = useAppDispatch()
    
    const onlineUsers:[] = []
    const role = useRole();

    const classroomId = role == 'student'?
        useAppSelector(state=>state.persistedData.studentDatas?.classroom_id):
        useAppSelector(state=>state.persistedData.teacherDatas?.classroom_id);

    const activeUser = role == 'student' ?
        useAppSelector(state => state.studentAuth.user?._id) :
        useAppSelector(state => state.teacherAuth.user?._id);

    useEffect(() => {
        if (activeUser) {
            console.log('establishing connections..... ')
            const socket = io(BASE_URL, {
                query: {
                    classroomId,
                    userId: activeUser
                }
            });

            setSocket(socket);

            socket.on('onlineUsers', (users) => {
                
                console.log("online: ", users);
                dispatch(setOnlineUsers({onlineUsers:users}))
            })

            socket.on('announcement',data=>{
                console.log(data)
                dispatch(addAnnouncementStudent(data))
                dispatch(addAnnouncementTeacher(data))
            })

            return () => { socket.close() }
        } else {
            socket?.close();
            setSocket(null)
        }
    }, []);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            <Outlet />
        </SocketContext.Provider>
    )
}