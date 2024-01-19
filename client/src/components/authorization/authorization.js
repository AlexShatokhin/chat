import { useState } from "react"

import AuthorizationForm from "./AuthorizationForm";
import RegistrationForm from "./RegistrationForm";

import "./authorization.scss"
const Authorization = () => {

    const [isRegisterMode, setIsRegisterMode] = useState(false);

    function changeFormMode(){
        setIsRegisterMode(mode => !mode);
    }

    return (
        <div className="auth-form">
            {!isRegisterMode ? 
                <AuthorizationForm changeFormMode = {changeFormMode}/> : 
                <RegistrationForm changeFormMode = {changeFormMode}/>}
        </div>
    )
}

export default Authorization