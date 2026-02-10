'use client'
import { useState } from "react";
import {useSocket} from "../context/SocketProvider"
import classes from './page.module.css'

export default function Page(){
  const { sendMessage, messages }= useSocket();
  const [message,setMessage]=useState('')
  const [isSent, setIsSent] = useState(false);

  const handleSend = () => {
    if(message.trim()) {
      sendMessage(message);
      setIsSent(!isSent);
      setMessage('');
    }
  }

  return (
    <div className={classes.wrapper}>
      {/* Sidebar */}
      <div className={classes.sidebar}>
        <div className={classes.sidebarHeader}>
          <h2>Chats</h2>
          <div className={classes.sidebarIcons}>
            <span>⋯</span>
          </div>
        </div>
        <div className={classes.searchBox}>
          <input type="text" placeholder="Search..." />
        </div>
        <div className={classes.chatList}>
          <div className={classes.chatItem}>
            <div className={classes.chatAvatar}>C</div>
            <div className={classes.chatInfo}>
              <h3>Chat Room</h3>
              <p>Latest message here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat */}
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.headerInfo}>
            <div className={classes.headerAvatar}>C</div>
            <div>
              <h2>Chat Room</h2>
              <p>Active now</p>
            </div>
          </div>
          <div className={classes.headerIcons}>
            <span>📞</span>
            <span>📹</span>
            <span>⋯</span>
          </div>
        </div>

        <div className={classes.chat}>
          <ul className={classes.messages}>
            {messages.map((msg, index) => {
              const isAlternate = index % 2 === 0;
              return (
                <li key={index} className={`${classes.message} ${isAlternate ? classes.messageSent : classes.messageReceived}`}>
                  {msg}
                </li>
              );
            })}
          </ul>

          <div className={classes['input-group']}>
            <button className={classes.attachBtn}>📎</button>
            <input
              value={message}
              onChange={e=>setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className={classes['chat-input']}
              placeholder="Message..."
              type="text"
            />
            <button
              type="button"
              onClick={handleSend}
              className={classes.sendBtn}
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}