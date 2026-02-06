'use client'
import { useState } from "react";
import {useSocket} from "../context/SocketProvider"
import classes from './page.module.css'

export default function Page(){
  const { sendMessage, messages }= useSocket();
  const [message,setMessage]=useState('')

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1>All messages will appear here</h1>
      </div>

      <div className={classes.chat}>
        <ul className={classes.messages}>
          {messages.map((msg, index) => (
            <li key={index} className={classes.message}>{msg}</li>
          ))}
        </ul>

        <div className={classes['input-group']}>
          <input
            value={message}
            onChange={e=>setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (message.trim()) {
                  sendMessage(message);
                  setMessage('');
                }
              }
            }}
            className={classes['chat-input']}
            placeholder="Message..."
            type="text"
          />
          <button
            type="button"
            onClick={()=> {
              if(message.trim()) {
                sendMessage(message);
                setMessage('');
              }
            }}
            className={classes['button']}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}