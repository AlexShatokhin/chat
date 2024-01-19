import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { setUserInformation } from "../../actions/actions";

import "./authorization.scss"
const AuthorizationForm = ({changeFormMode}) => {


    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const socket = useSelector(state => state.socket);
    const navigate = useNavigate();

    useEffect(() => {
        if(socket)
            socket.current.on("authChecked", (data) => {
                const {name, login} = data;
                dispatch(setUserInformation(data))

                if(typeof name !== "number")
                    navigate(login)

            })
    }, [])

    function checkUserAuth(){
        if(login && password)
		    socket.current.emit("auth", login, password)
	}

    return (
        <>
            <div className="auth-text">
                <div className="title">Авторизация</div>
                <hr />
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
                value="Войти"
                onClick={checkUserAuth}
                className="auth-send" />
                

            <div className="registration-wrapper">
                <span onClick={changeFormMode} className="registration">Регистрация</span>
            </div>
        </>
    )

}

export default AuthorizationForm;