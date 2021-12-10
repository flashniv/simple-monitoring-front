import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import APIServer from "../../API/APIServer";
import classes from "./Login.module.css";

function Login(){
    const span=useRef(null)
    let navigate = useNavigate()
    const [login,setLogin]=useState("")
    const [password,setPassword]=useState("")

    function onError(reason){
        span.current.style.display="block"
    }

    var onLogin=()=>{
        localStorage.setItem('userLogin',login)
        localStorage.setItem('userPassword',password)
        const response=APIServer.getContent("/apiv1/gui/dashboard/currentProblems")
        response.then((value)=>{
            APIServer.setLoggedIn(true)
            navigate("/", { replace: true });
        },onError)
    }

    return (
        <div className={classes.Login}>
            <div className={classes.LoginForm}>
                <span ref={span} className={classes.Span}>Login failed!!!</span>
                <input className={classes.Input} type="text" value={login} onChange={e => setLogin(e.target.value)}/>
                <input className={classes.Input} type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button className={classes.Button} onClick={onLogin}>login</button>
            </div>
        </div>
    );
}

export default Login;
