import {Navigate} from "react-router-dom";
import APIServer from "../../API/APIServer";

function Logout({setLoggedIn}){
    APIServer.setLoggedOut()
    setLoggedIn(false)
    return(
        <Navigate to="/signin" />
    )
}

export default Logout;