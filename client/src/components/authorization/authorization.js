import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import {useDispatch, useSelector} from "react-redux"

import { setUserInformation } from "../../actions/actions";

import "./authorization.scss"
const Authorization = () => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const socket = useSelector(state => state.socket);
    const navigate = useNavigate();

    useEffect(() => {
        if(socket){
            socket.current.on("connect", () => {
                console.log("User connected successfully!");
                socket.current.on("authChecked", (data) => {
                    const {name, login} = data;
                    dispatch(setUserInformation(data))

                    if(typeof name !== "number")
                        navigate(login)

                })
            })
        }
    }, [socket])

	function checkUserAuth(login, password){
		socket.current.emit("auth", login, password)
	}

    return (
        <div className="auth-form">
            <div className="auth-text">
                <div className="title">Авторизация</div>
                <hr />
            </div>

            <input 
                value={login}
                onChange={e => setLogin(e.target.value)}
                name = "login" 
                type="text" 
                className="auth-input" 
                placeholder="Логин"/>

            <input 
                value={password}
                onChange={e => setPassword(e.target.value)}
                name = "password" 
                type="password" 
                className="auth-input"
                placeholder="Пароль"/>

            <button
                onClick={() => checkUserAuth(login, password)}
                className="auth-send">Войти</button>
                
        </div>
    )
}

export default Authorization