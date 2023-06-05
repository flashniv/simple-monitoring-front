import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@emotion/react";
import SignIn from "./pages/login/SignIn";
import Index from "./pages/index/Index";

const defaultTheme = createTheme();

function App() {
    const [loggedIn,setLoggedIn] = useState()

    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Index />}/>
                    <Route path={"/sign-in"} element={<SignIn />}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
