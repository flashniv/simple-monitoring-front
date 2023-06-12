import * as React from 'react';
import {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Avatar, CircularProgress, FormControl, InputLabel, Menu, MenuItem, Select} from "@mui/material";
import useOrganizationsQuery from "../../api/graphql/useOrganizationsQuery";
import Summary from "./summary/Summary";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemText from "@mui/material/ListItemText";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import Metrics from "./metrics/Metrics";
import Triggers from "../triggers/Triggers";
import {useNavigate} from "react-router-dom";
import {pink} from "@mui/material/colors";
import {Person} from "@mui/icons-material";
import Button from "@mui/material/Button";
import Configuration from "./configuration/Configuration";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

type DashboardProps = {
    setAlert: React.Dispatch<React.SetStateAction<any>>;
}

export default function Dashboard({setAlert}: DashboardProps) {
    const [open, setOpen] = React.useState(false);
    const organizationsQuery = useOrganizationsQuery();
    const [selectedOrg, setSelectedOrg] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("accessToken") !== null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openProfileMenu = Boolean(anchorEl);
    const navigate = useNavigate();


    useEffect(() => {
        if (!organizationsQuery.loading && organizationsQuery.data && organizationsQuery.data.organizations && organizationsQuery.data.organizations.length > 0) {
            const orgs = organizationsQuery.data.organizations;
            setSelectedOrg(orgs[0].id);
        }
    }, [organizationsQuery.loading])

    function isLoading() {
        if (organizationsQuery.loading) return true;
        return false;
    }

    function logout() {
        setAnchorEl(null);
        localStorage.removeItem("accessToken");
        navigate("/sign-in");
    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpen(!open)}
                        sx={{
                            marginRight: '36px',
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{flexGrow: 1}}
                    >
                        Dashboard
                    </Typography>
                    {isLoading()
                        ? <CircularProgress sx={{color: "inherit", mr: 2}}/>
                        : <></>
                    }
                    <FormControl sx={{m: 1, color: "inherit", minWidth: 220}}>
                        <InputLabel sx={{color: "inherit"}}
                                    id="demo-simple-select-standard-label">Organization</InputLabel>
                        <Select sx={{color: "inherit"}} labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard" label="Organization" value={selectedOrg}
                                onChange={e => setSelectedOrg(e.target.value)}>
                            {organizationsQuery.data?.organizations?.map(value =>
                                <MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>
                    {loggedIn
                        ? <>
                            <Avatar sx={{bgcolor: pink[500], ml: 2}}
                                    onClick={event => setAnchorEl(event.currentTarget)}>
                                <Person/>
                            </Avatar>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={openProfileMenu}
                                onClose={() => setAnchorEl(null)}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={logout}>Logout</MenuItem>
                            </Menu>
                        </>
                        : <Button variant="outlined" sx={{color: "inherit", ml: 2}} size="small"
                                  onClick={() => navigate("/sign-in")}>
                            Sign in
                        </Button>
                    }
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={() => setOpen(!open)}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </Toolbar>
                <Divider/>
                <List component="nav">
                    <ListItemButton onClick={() => setCurrentPage(1)}>
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard"/>
                    </ListItemButton>
                    <ListItemButton onClick={() => setCurrentPage(2)}>
                        <ListItemIcon>
                            <BarChartIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Metrics"/>
                    </ListItemButton>
                    <ListItemButton onClick={() => setCurrentPage(3)}>
                        <ListItemIcon>
                            <LayersIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Triggers"/>
                    </ListItemButton>
                    <Divider/>
                    <ListItemButton onClick={() => setCurrentPage(4)}>
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Configuration"/>
                    </ListItemButton>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    minHeight: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar/>
                {currentPage === 1 ? <Summary/> : <></>}
                {currentPage === 2 ? <Metrics setAlert={setAlert} orgId={selectedOrg}/> : <></>}
                {currentPage === 3 ? <Triggers setAlert={setAlert} orgId={selectedOrg}/> : <></>}
                {currentPage === 4 && organizationsQuery.data?.organizations!==undefined ? <Configuration organizations={organizationsQuery.data?.organizations}/> : <></>}
                <Copyright sx={{pt: 4}}/>
            </Box>
        </Box>
    );
}
