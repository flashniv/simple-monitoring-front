import classes from "./Dashboard.module.css";
import DashboardAlertPanel from "../../components/DashboardAlertPanel/DashboardAlertPanel";
import DashboardStatusPanel from "../../components/DashboardStatusPanel/DashboardStatusPanel";

function Dashboard() {
    return (
        <div className={classes.Dashboard}>
            <DashboardAlertPanel/>
            <DashboardStatusPanel/>
        </div>
    );
}

export default Dashboard;
