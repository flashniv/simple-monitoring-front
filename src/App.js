import React from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import NavBar from "./components/NavBar/NavBar";
import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Metrics from "./pages/Metrics/Metrics";
import MetricDetail from "./pages/MetricDetail/MetricDetail";
import History from "./pages/History/History";
import Login from "./pages/Login/Login";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                {window.location.pathname.localeCompare("/login")!=0
                    ?<NavBar />
                    :<></>
                }
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/metrics" element={<Metrics />} />
                    <Route path="/metricDetail">
                        <Route path=":path" element={<MetricDetail />} />
                    </Route>
                    <Route path="/history" element={<History />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>

        </BrowserRouter>
    );
}

export default App;
