import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<div>asdasd</div>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
