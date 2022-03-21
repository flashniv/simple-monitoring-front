import React, {useState} from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import NavBar from "./components/NavBar/NavBar";
import "./styles/App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Metrics from "./pages/Metrics/Metrics";
import MetricDetail from "./pages/MetricDetail/MetricDetail";
import History from "./pages/History/History";
import AlertFilters from "./pages/AlertFilters/AlertFilters";
import Logout from "./components/Logout/Logout";
import APIServer from "./API/APIServer";
import SignIn from "./pages/SignIn/SignIn";
import IndexPage from "./pages/Index/IndexPage";
import {createTheme, ThemeProvider} from "@mui/material";

function App() {
    const [loggedIn, setLoggedIn] = useState(APIServer.isLoggedIn)
    const theme=createTheme({
        palette: {
            primary: {
                main: '#2368f3',
            },
            secondary: {
                main: '#66385a',
            },
        },
    })
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <NavBar loggedIn={loggedIn}/>
                <Routes>
                    <Route path="/" element={<IndexPage/>}/>
                    <Route path="/signin" element={<SignIn setLoggedIn={setLoggedIn}/>}/>
                    {loggedIn
                        ? <>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                            <Route path="/metrics" element={<Metrics/>}/>
                            <Route path="/metricDetail">
                                <Route path=":path" element={<MetricDetail/>}/>
                            </Route>
                            <Route path="/history" element={<History/>}/>
                            <Route path="/alertFilters" element={<AlertFilters/>}/>
                            <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn}/>}/>
                        </>
                        : <></>
                    }
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
