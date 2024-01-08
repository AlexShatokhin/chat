import { useEffect } from "react";

import "./disconnect.scss"
const Disconnect = ({socket, data}) => {

    return (
        <div className="disconnect-content">
            <div className="username">Привет, {data.name}!</div>
            <button onClick = {() => socket.current.emit("forceDisconnect")} className="disconnect-button">Выйти</button>
        </div>
    )
}

export default Disconnect;