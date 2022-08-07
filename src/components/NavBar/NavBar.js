import React, {useState} from "react";
import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SmsIcon from '@mui/icons-material/Sms';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import API from "../../API/API";

export default function NavBar({title, loggedIn, setLoggedIn, alert, setAlert}) {
    const [showSidebar, setShowSidebar] = useState(false)
    const navigate = useNavigate()

    const logout = function () {
        API.setLoggedOut()
        setLoggedIn(false)
        navigate("/", {"replace": true})
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar
                    sx={{
                        justifyContent: "space-between"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={() => setShowSidebar(true)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        {window.location.pathname.localeCompare("/") !== 0
                            ? <>
                                <IconButton
                                    onClick={() => {
                                        navigate(-1)
                                    }}
                                    sx={{
                                        color: "white",
                                        mr: 1
                                    }}
                                >
                                    <ArrowBackIcon/>
                                </IconButton>
                            </>
                            : <></>}
                        <Typography variant="h6" component="div">
                            {title}
                        </Typography>
                    </Box>
                    <Box>
                        {loggedIn
                            ? <Button
                                color="inherit"
                                onClick={logout}
                            >
                                Sign out
                            </Button>
                            : <Button
                                color="inherit"
                                onClick={() => navigate("/login", {replace: true})}
                            >
                                Sign in
                            </Button>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            <CssBaseline/>
            {alert}
            <Drawer
                anchor="left"
                PaperProps={{
                    sx: {
                        justifyContent: "space-between",
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                        minWidth: "350px"
                    }
                }}
                open={showSidebar}
                onClose={() => setShowSidebar(false)}
            >
                <List
                    component="nav"
                >
                    <ListItemButton onClick={() => {
                        navigate("/", {replace: false});
                        setShowSidebar(false);
                    }}>
                        <HomeIcon/>
                        <ListItemText sx={{ml: 2}} primary="Home"/>
                    </ListItemButton>
                    {loggedIn
                        ? <>
                            <ListItemButton onClick={() => {
                                navigate("/send-email", {replace: false});
                                setShowSidebar(false);
                            }}>
                                <AlternateEmailIcon/>
                                <ListItemText sx={{ml: 2}} primary="Email sender"/>
                            </ListItemButton>
                        </>
                        : <></>
                    }
                </List>
            </Drawer>
        </>
    )
}