import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import img from "../../assets/unknown.png"

import "./users.scss"
const Users = () => {

    const [users, setUsers] = useState([]);
    const socket = useSelector(state => state.socket);

    useEffect(() => {
        socket.current.emit("getUsersStatus")
        socket.current.on("usersFetched", setUsers)
    }, [])

    function renderUsers(){
        return users.map(user => {
            const isOnline = user.online
            return (
                <div key = {user.id} className="user">
                    <img src = {img} alt="avatar" className="user-image" />
                    <div className="user-data">
                        <div className="user-name">{user.name}</div>
                        <div className={`user-status ${isOnline ? "green" : "red"}`}>{ isOnline ? "В сети" : "Не в сети"}</div>
                    </div>
                </div>
            )
        })
    }

    return (
        <>
            {renderUsers()}
        </>
    )

}

export default Users;