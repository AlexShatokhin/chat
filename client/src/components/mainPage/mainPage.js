import Users from "../users/users"
import Disconnect from "../disconnect/disconnect"
import Chat from "../chat/chat"
import ChatInput from "../chatInput/chatInput"

import "./mainPage.scss"
const MainPage = () => {
    return (
        <div className="main-page">
            <div className="users">
                <div className="users-header">Пользователи</div>
                <div className="users-content">
                    <Users />
                </div> 
            </div>
            <div className="chat">
                <div className="chat-header">
                    <div className="chat-title">Общий чат</div>
                    <div className="chat-disconnect">
                        <Disconnect /> 
                    </div>
                </div>
                <div className="chat-content">
                    <Chat />
                </div>
                <div className="chat-input">
                    <ChatInput />
                </div>
            </div>
        </div>
    )
}

export default MainPage;