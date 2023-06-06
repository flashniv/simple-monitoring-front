import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import {AuthenticationRequest} from "../../types/AuthenticationRequest";
import API from "../../api/API";
import {AxiosError} from "axios";
import useOrganizationsQuery from "../../api/gaphql/useOrganizationsQuery";

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

type SelectOrgPageProps = {
    setAlert: React.Dispatch<React.SetStateAction<AxiosError<any>>>;
}

function SelectOrgPage({setAlert}: SelectOrgPageProps) {
    const {data, error, loading, refetch} = useOrganizationsQuery();

    console.log(data);
    console.log(error);
    console.log(loading);

    return (
        <>
            <Button onClick={()=>refetch()}>
                refresh
            </Button>
        </>
    );
}

type SignInPageProps = {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    setAlert: React.Dispatch<React.SetStateAction<AxiosError<any>>>;
}

function SignInPage({setLoggedIn, setAlert}: SignInPageProps) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const inEmail = data.get('email');
        const inPassword = data.get('password');

        if (typeof inEmail === 'string' && typeof inPassword === 'string') {
            const authRequest: AuthenticationRequest = {
                email: inEmail,
                password: inPassword
            };
            API.signIn(authRequest, (success) => {
                localStorage.setItem("accessToken", success.access_token);
                localStorage.setItem("refreshToken", success.refresh_token);
                setLoggedIn(true);
            }, (reason) => {
                setAlert(reason);
            })
        }
    };

    return (
        <>
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <LockOpenIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
                <Copyright sx={{mt: 5}}/>
            </Box>
        </>
    );
}

type SignInProps = {
    setAlert: React.Dispatch<React.SetStateAction<AxiosError<any>>>;
}
export default function SignIn({setAlert}: SignInProps) {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    return (
        <Grid container component="main" sx={{height: '100vh'}}>
            <CssBaseline/>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {!loggedIn
                        ? <SignInPage setAlert={setAlert} setLoggedIn={setLoggedIn}/>
                        : <SelectOrgPage setAlert={setAlert}/>
                    }
                </Box>
            </Grid>
        </Grid>
    );
}