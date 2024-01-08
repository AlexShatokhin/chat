import { useState } from "react"

import "./authorization.scss"
const Authorization = ({checkUserAuth}) => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

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