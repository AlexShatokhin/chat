import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setUserInformation } from "../../actions/actions";

import "./disconnect.scss"
const Disconnect = () => {

    const userData = useSelector(state => state.authData);
    const socket = useSelector(state => state.socket);
    const dispatch = useDispatch();

    function disconnect(){
        dispatch(setUserInformation({}))
        socket.current.emit("forceDisconnect");
    }

    return (
        <div className="disconnect-content">
            <div className="username">Привет, {userData.name}!</div>
            <Link to = "/">
                <input
                    type="button" 
                    onClick = {disconnect} 
                    className="disconnect-button"
                    value="Выйти" />
            </Link>

        </div>
    )
}

export default Disconnect;