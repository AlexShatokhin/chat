import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "./authorization.scss"
const RegistrationForm = ({checkUserAuth, changeFormMode}) => {
    
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [registrationData, setRegistrationData] = useState({});

    const socket = useSelector(state => state.socket);

    useEffect(() => {
        if(socket)
            socket.current.on("registerUserInfo", (information) => setRegistrationData(information));
    }, [])

    function registerUser(){
        setRegistrationData({});
        if(name && login && password)
            socket.current.emit("registerUser", name, login, password)
    }

    return (
        <>
        <div className="auth-text">
            <div className="title">Регистрация</div>
            <hr />
        </div>

        <span className={`registration-message ${registrationData.status === 200 ? "green" : "red"}`}>{registrationData.message}</span>

        <div className={`input-wrapper ${name !== "" ? "input-wrapper-success" : "input-wrapper-error"}`}>
            <input 
                value={name}
                onChange={e => setName(e.target.value)}
                name = "name" 
                type="text" 
                className="auth-input" 
                placeholder="Имя"/>
        </div>

        <div className={`input-wrapper ${login !== "" ? "input-wrapper-success" : "input-wrapper-error"}`}>
            <input 
                value={login}
                onChange={e => setLogin(e.target.value)}
                name = "login" 
                type="text" 
                className="auth-input" 
                placeholder="Логин"/>
        </div>

        <div className={`input-wrapper ${password !== "" ? "input-wrapper-success" : "input-wrapper-error"}`}>
            <input 
                value={password}
                onChange={e => setPassword(e.target.value)}
                name = "password" 
                type="password" 
                className="auth-input"
                placeholder="Пароль"/>
        </div>





        <input
            type="button"
            value="Регистрация"
            onClick={() => registerUser(name, login, password)}
            className="auth-send" />
            

        <div className="registration-wrapper">
            <span onClick={changeFormMode} className="registration">Авторизация</span>
        </div>
    </>
    )
}

export default RegistrationForm;