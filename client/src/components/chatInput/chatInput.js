import { useState } from "react";
import { useSelector } from "react-redux";

import "./chatInput.scss"
const ChatInput = () => {

    const [message, setMessage] = useState("");
    const socket = useSelector(state => state.socket);

    function sendMessage(){
        if(message !== ""){
            socket.current.emit("addNewMessage", message);
            setMessage("");
        }
    }

    return (
        <div className="chat-form">
            <input
                type="text" 
                className="chat-form__input" 
                placeholder="Введите сообщение..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === "Enter" ? sendMessage() : null}/>

            <input 
                type="button" 
                className="chat-form__button" 
                value="Отправить"
                onClick={sendMessage}/>
        </div>
    );

}

export default ChatInput;