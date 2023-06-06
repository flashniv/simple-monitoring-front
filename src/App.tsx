import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@emotion/react";
import SignIn from "./pages/login/SignIn";
import Index from "./pages/index/Index";
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "./api/gaphql/MyApolloClient";

const defaultTheme = createTheme();

function App() {
    const [loggedIn, setLoggedIn] = useState()
    const [alert,setAlert] = useState<any>();
    return (
        <ThemeProvider theme={defaultTheme}>
            <ApolloProvider client={apolloClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={<Index/>}/>
                        <Route path={"/sign-in"} element={<SignIn setAlert={setAlert}/>}/>
                    </Routes>
                </BrowserRouter>
            </ApolloProvider>
        </ThemeProvider>
    );
}

export default App;
