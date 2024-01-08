import { useEffect, useState } from "react"
import { useNavigate } from "react-router";

import "./authorization.scss"
const Authorization = ({socket, setUserData}) => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [signData, setSignData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if(socket.current){
            console.log("Good morning!");
            socket.current.on("connect", () => {
                console.log("User connected successfully!");
                socket.current.on("authChecked", (data) => {
                    const {name, login} = data;
                    setSignData(data);
                    setUserData(data);

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
                <div className="title">
                    Авторизация
                </div>
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
                className="auth-send"> Войти </button>
                
        </div>
    )
}

export default Authorization