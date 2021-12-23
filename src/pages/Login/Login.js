import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import APIServer from "../../API/APIServer";
import classes from "./Login.module.css";
import {useForm} from "react-hook-form";

function Login(){
    // eslint-disable-next-line no-unused-vars
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    if(Object.keys(errors).length!==0){
        console.error(errors)
    }
    
    const span=useRef(null)
    let navigate = useNavigate()

    function onError(reason){
        span.current.style.display="block"
    }

    var onLogin=(data)=>{
        localStorage.setItem('userLogin',data.login)
        localStorage.setItem('userPassword',data.password)
        const response=APIServer.getContent("/apiv1/gui/dashboard/currentProblems")
        response.then((value)=>{
            APIServer.setLoggedIn(true)
            navigate("/", { replace: true });
        },onError)
    }

    return (
        <div className={classes.Login}>
            <div className={classes.LoginForm}>
                <form onSubmit={handleSubmit(onLogin)}>
                    <span ref={span} className={classes.Span}>Login failed!!!</span>
                    <input className={classes.Input} type="text" {...register("login", { required: true, maxLength: 80 })} />
                    <input className={classes.Input} type="password" {...register("password", { required: true, minLength: 8 })} />
                    <button className={classes.Button} type="submit">login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
