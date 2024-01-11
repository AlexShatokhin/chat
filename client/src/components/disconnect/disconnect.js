import {Link} from "react-router-dom"
import "./disconnect.scss"
const Disconnect = ({socket, data}) => {

    return (
        <div className="disconnect-content">
            <div className="username">Привет, {data.name}!</div>
            <Link to = "/">
                <button onClick = {() => socket.current.emit("forceDisconnect")} className="disconnect-button">
                    Выйти
                </button>
            </Link>

        </div>
    )
}

export default Disconnect;