import {useEffect} from "react"

import "./mainPage.scss"
const MainPage = ({socket}) => {

    useEffect(() => {
        socket.current.emit("getUsersStatus")
        socket.current.on("usersFetched", (data) => {
            console.log(data);
        })
    }, [])

    return (
        <div className="main-page">
            <div className="users">
                <div className="users-header">
                    Пользователи
                </div>
                <div className="users-content">
                    
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