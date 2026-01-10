import { log } from 'console';
import {Server} from 'socket.io';
import {Redis} from 'ioredis';

const pub=new Redis({
    host:'valkey-7a2a979-uditverma145-712c.i.aivencloud.com',
    port:26406,
    username:'default',
    password:'AVNS_VAGIVNgBSmmiJjc6ryw'
});
const sub=new Redis({
    host:'valkey-7a2a979-uditverma145-712c.i.aivencloud.com',
    port:26406,
    username:'default',
    password:'AVNS_VAGIVNgBSmmiJjc6ryw'
});

class SocketService{
    private _io:Server;
    constructor(){
        console.log('Init Socket Service');
        this._io=new Server({
            cors:{
                allowedHeaders:["*"],
                origin:"*",
            },
        });
        sub.subscribe('MESSAGES')
    }

    public initListeners(){
        const io=this.io;
        console.log("Init Socket Listeners...");
        io.on('connect', (socket)=>{
            console.log("New socket connected",socket.id);
            socket.on('event:message',async({message}:{message:string})=>{
                console.log("New Message Rec.", message);
                //Publish this message to Redis
                await pub.publish('MESSAGES',JSON.stringify({message}));
            });
        });
        sub.on('message',(channel,message)=>{
            if(channel==='MESSAGES'){
                console.log('New Message received from Redis',message);
                io.emit('message',message);
            }
        })
    }

    get io(){
        return this._io;
    }
}
export default SocketService;