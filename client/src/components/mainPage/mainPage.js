import Users from "../users/users"

import "./mainPage.scss"
const MainPage = ({socket}) => {

    return (
        <div className="main-page">
            <div className="users">
                <div className="users-header">
                    Пользователи
                </div>
                <div className="users-content">
                    <Users socket={socket}/>
                </div> 
            </div>
            <div className="chat">
                <div className="chat-header">

                </div>
                <div className="chat-content">

                </div>
                <div className="chat-input">

                </div>
            </div>
        </div>
    )
}

export default MainPage;