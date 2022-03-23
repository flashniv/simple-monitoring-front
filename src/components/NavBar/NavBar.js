import React from "react";
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router";

function NavBar({loggedIn}) {
    const navigate = useNavigate()

    const onClick = function (path) {
        navigate(path, {replace: false});
    }

    return (
        <AppBar
            position="static"
            sx={{
                mb:1
            }}
        >
            <Toolbar>
                <Typography variant="h6" component="div" sx={{mr: 2}}>
                    SimpleMonitoring
                </Typography>
                {loggedIn
                    ? <>
                        <Button color="inherit" sx={{ backgroundColor:"secondary.main",mr:1}} onClick={() => onClick("/dashboard")}>Dashboard</Button>
                        <Button color="inherit" sx={{ backgroundColor:"secondary.main",mr:1}} onClick={() => onClick("/metrics")}>Metrics</Button>
                        <Button color="inherit" sx={{ backgroundColor:"secondary.main",mr:1}} onClick={() => onClick("/history")}>History</Button>
                        <Button color="inherit" sx={{ backgroundColor:"secondary.main"}} onClick={() => onClick("/alertFilters")}>Alert filters</Button>
                        <Box sx={{flexGrow: 1}}/>
                        <Button color="inherit" sx={{ backgroundColor:"secondary.main"}} onClick={() => onClick("/logout")}>Logout</Button>
                    </>
                    : <>
                        <Box sx={{flexGrow: 1}}/>
                        <Button color="inherit" sx={{ backgroundColor:"secondary.main"}} onClick={() => onClick("/signin")}>Sign In</Button>
                    </>
                }
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
