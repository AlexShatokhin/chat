import { useState } from "react";

import "./chatInput.scss"
const ChatInput = ({socket}) => {

    const [message, setMessage] = useState("")

    function sendMessage(){
        if(message !== ""){
            socket.current.emit("addNewMessage", message);
            setMessage("");
        }
    }

    return (
        <div className="chat-form">
            <input
                multiple
                type="text" 
                className="chat-form__input" 
                placeholder="Введите сообщение"
                value={message}
                onChange={e => setMessage(e.target.value)}/>

            <input 
                type="button" 
                className="chat-form__button" 
                value="Отправить"
                onClick={sendMessage}/>
        </div>
    );

}

export default ChatInput;