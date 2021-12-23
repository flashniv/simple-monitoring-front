import classes from "./Dashboard.module.css";
import DashboardAlertPanel from "../../components/DashboardAlertPanel/DashboardAlertPanel";
import DashboardStatusPanel from "../../components/DashboardStatusPanel/DashboardStatusPanel";
import APIServer from "../../API/APIServer";
import {Navigate} from "react-router-dom";

function Dashboard(){
    return (
        <>
            {APIServer.isLoggedIn()
                ?<div className={classes.Dashboard}>
                    <DashboardAlertPanel />
                    <DashboardStatusPanel />
                </div>
                :<Navigate to="/login" />
            }
        </>
    );
}

export default Dashboard;
