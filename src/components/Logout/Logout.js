import {Navigate} from "react-router-dom";
import APIServer from "../../API/APIServer";

function Logout(){
    APIServer.setLoggedOut()
    return(
        <Navigate to="/login" />
    )
}

export default Logout;