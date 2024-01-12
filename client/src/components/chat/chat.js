import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./chat.scss"
const Chat = () => {

    const [messages, setMessages] = useState([]);
    const userData = useSelector(state => state.authData);
    const socket = useSelector(state => state.socket);


    useEffect(() => {
        socket.current.on("getMessage", (message) => {
            setMessages(getMessagesWithOwner(message))
        });

        const chat = document.querySelector(".chat-wrapper");
        chat.scrollTop = chat.scrollHeight;

    })

    function getMessagesWithOwner(messages){
        return messages.map(message => {
            message.isOwner = message.login === userData.login;
            return message;
        })
    }

    function renderMessages(){
        return messages.map(message => {
            return (
                <div key = {message.id} className={message.isOwner ? "message-item owner" : "message-item"}>
                    <div className="message-owner">
                        {message.isOwner ? "Вы" : message.name}
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