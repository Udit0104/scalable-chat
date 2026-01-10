'use client'
import { log } from 'console';
import React,{useCallback,useEffect,useContext,useState} from 'react'
import {io,Socket} from "socket.io-client"
interface SocketProviderProps{
    children?: React.ReactNode
}

interface ISocketContext{
    sendMessage:(msg:string)=>any;
    messages:string[];
}

const SocketContext=React.createContext<ISocketContext | null>(null)

export const useSocket=()=>{
    const state = useContext(SocketContext)
    if(!state) throw new Error(`state is undefined`)

    return state;
}

export const SocketProvider:React.FC<SocketProviderProps>=({children})=>{

    const [socket,setSocket]=useState<Socket>()
    const [messages,setMessages]=useState<string[]>([])

    const sendMessage: ISocketContext['sendMessage'] = useCallback((msg)=>{
        console.log('Send Message',msg);
        if(socket){
            socket.emit('event:message',{message:msg})
        }
    },[socket]);

    const onMessageRec=useCallback((msg:string)=>{
        console.log('From server message received');
        const {message}=JSON.parse(msg) as {message:string}
        setMessages(prev=>[...prev,message]);
    },[])

    useEffect(()=>{
        const _socket=io('http://localhost:8000')
        _socket.on('message',onMessageRec)
        setSocket(_socket)
        return ()=>{
            _socket.disconnect();
            _socket.off('message',onMessageRec)
            setSocket(undefined)
        };
    },[])

    return (
        <SocketContext.Provider value={{sendMessage,messages}}>
            {children}
        </SocketContext.Provider>
    )
}

// function useCallback(arg0: (msg: any) => void, arg1: never[]): (msg: string) => any {
//     throw new Error('Function not implemented.');
// }
