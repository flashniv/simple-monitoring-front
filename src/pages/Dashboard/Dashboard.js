import DashboardAlertPanel from "../../components/DashboardAlertPanel/DashboardAlertPanel";
import DashboardStatusPanel from "../../components/DashboardStatusPanel/DashboardStatusPanel";
import {Box} from "@mui/material";

function Dashboard() {
    return (
        <Box
            sx={{
                display:"flex"
            }}
        >
            <DashboardAlertPanel/>
            <DashboardStatusPanel/>
        </Box>
    );
}

export default Dashboard;
