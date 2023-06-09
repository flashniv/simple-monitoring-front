import * as React from 'react';
import {useState} from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {useNavigate} from "react-router-dom";
import {Avatar, Menu, MenuItem} from "@mui/material";
import {pink} from "@mui/material/colors";
import {Person} from "@mui/icons-material";

interface HeaderProps {
    sections: ReadonlyArray<{
        title: string;
        url: string;
    }>;
    title: string;
}

export default function Header(props: HeaderProps) {
    const {sections, title} = props;
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("accessToken") !== null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    function logout() {
        setAnchorEl(null);
        localStorage.removeItem("accessToken");
        navigate("/sign-in");
    }

    return (
        <React.Fragment>
            <Toolbar sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Button size="small">Subscribe</Button>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{flex: 1}}
                >
                    {title}
                </Typography>
                <IconButton>
                    <SearchIcon/>
                </IconButton>
                {loggedIn
                    ? <>
                        <Avatar sx={{bgcolor: pink[500]}} onClick={event => setAnchorEl(event.currentTarget)}>
                            <Person/>
                        </Avatar>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={()=>setAnchorEl(null)}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </Menu>
                    </>
                    : <Button variant="outlined" size="small" onClick={() => navigate("/sign-in")}>
                        Sign in
                    </Button>
                }
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{justifyContent: 'space-between', overflowX: 'auto'}}
            >
                {sections.map((section) => (
                    <Link
                        color="inherit"
                        noWrap
                        key={section.title}
                        variant="body2"
                        href={section.url}
                        sx={{p: 1, flexShrink: 0}}
                    >
                        {section.title}
                    </Link>
                ))}
            </Toolbar>
        </React.Fragment>
    );
}
