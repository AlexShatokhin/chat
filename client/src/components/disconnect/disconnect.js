import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import "./disconnect.scss"
const Disconnect = () => {

    const userData = useSelector(state => state.authData);
    const socket = useSelector(state => state.socket);

    return (
        <div className="disconnect-content">
            <div className="username">Привет, {userData.name}!</div>
            <Link to = "/">
                <input
                    type="button" 
                    onClick = {() => socket.current.emit("forceDisconnect")} 
                    className="disconnect-button"
                    value="Выйти" />
            </Link>

        </div>
    )
}

export default Disconnect;