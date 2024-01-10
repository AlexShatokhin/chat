import { useEffect, useState } from "react";

import "./chat.scss"
const Chat = ({socket}) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.current.on("getMessage", (message) => setMessages(message))
    })

    function renderMessages(){
        return messages.map(message => {
            return (
                <div className={message.isOwner ? "message-item owner" : "message-item"}>
                    <div className="message-owner">
                        {message.isOwner ? "Вы" : "Не вы"}
                    </div>
                    <div className="message-content">{message.messageContent}</div>
                    <div className="message-time">{message.sendTime}</div>
                </div>
            )
        })
    }

    return (
        <div className="chat-wrapper">
            {renderMessages()}
        </div>
    )
}

export default Chat;