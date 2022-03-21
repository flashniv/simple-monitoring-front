import React, {useRef} from "react";
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router";

function NavBar({loggedIn}) {
    const navigate = useNavigate()

    const onClick = function (path) {
        navigate(path, {replace: false});
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{mr: 2}}>
                    SimpleMonitoring
                </Typography>
                {loggedIn
                    ? <>
                        <Button color="inherit" onClick={() => onClick("/dashboard")}>Dashboard</Button>
                        <Button color="inherit" onClick={() => onClick("/metrics")}>Metrics</Button>
                        <Button color="inherit" onClick={() => onClick("/history")}>History</Button>
                        <Button color="inherit" onClick={() => onClick("/alertFilters")}>Alert filters</Button>
                        <Box sx={{flexGrow: 1}}/>
                        <Button color="inherit" onClick={() => onClick("/logout")}>Logout</Button>
                    </>
                    : <>
                        <Box sx={{flexGrow: 1}}/>
                        <Button color="inherit" onClick={() => onClick("/signin")}>Sign In</Button>
                    </>
                }
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
