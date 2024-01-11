import Users from "../users/users"
import Disconnect from "../disconnect/disconnect"
import Chat from "../chat/chat"
import ChatInput from "../chatInput/chatInput"

import "./mainPage.scss"
const MainPage = ({socket, data}) => {

    return (
        <div className="main-page">
            <div className="users">
                <div className="users-header">Пользователи</div>
                <div className="users-content">
                    <Users socket={socket}/>
                </div> 
            </div>
            <div className="chat">
                <div className="chat-header">
                    <div className="chat-title">Общий чат</div>
                    <div className="chat-disconnect">
                        <Disconnect socket={socket} data = {data} /> 
                    </div>
                </div>
                <div className="chat-content">
                    <Chat userData = {data} socket = {socket}/>
                </div>
                <div className="chat-input">
                    <ChatInput socket={socket}/>
                </div>
            </div>
        </div>
    )
}

export default MainPage;