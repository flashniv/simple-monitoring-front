import {createTheme, ThemeProvider} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import IndexPage from "./pages/index/IndexPage";
import {useState} from "react";
import NavBar from "./components/NavBar/NavBar";
import Login from "./pages/login/Login";
import API from "./API/API";
import Triggers from "./pages/triggers/Triggers";
import TriggerDetail from "./pages/triggers/TriggerDetail";
import Item from "./pages/item/Item";
import Items from "./pages/items/Items";

let theme = createTheme({
    palette: {
        primary: {
            main: '#76607d',
        },
        secondary: {
            main: '#628d5b',
        }
    }
})

function App() {
    const [title, setTitle] = useState("")
    const [alert, setAlert] = useState(<></>)
    const [loggedIn, setLoggedIn] = useState(API.isLoggedIn());

    const setAlertWithTimer = function (newAlert){
        setAlert(newAlert)
        window.setTimeout(()=>{
            setAlert(<></>)
        },3000)
    }

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <NavBar title={title} loggedIn={loggedIn} setLoggedIn={setLoggedIn} alert={alert}
                        setAlert={setAlertWithTimer}/>
                <Routes>
                    <Route path="/" element={<IndexPage setTitle={setTitle}/>}/>
                    <Route path="/login"
                           element={<Login setTitle={setTitle} setLoggedIn={setLoggedIn}/>}/>
                    <Route path="/triggers" element={<Triggers setAlert={setAlertWithTimer} setTitle={setTitle}/>}/>
                    <Route path="/trigger">
                        <Route path=":triggerId" element={<TriggerDetail setTitle={setTitle} setAlert={setAlertWithTimer}/>}/>
                    </Route>
                    <Route path="/items" element={<Items setAlert={setAlertWithTimer} setTitle={setTitle}/>}/>
                    <Route path="/item">
                        <Route path=":itemId" element={<Item setTitle={setTitle} setAlert={setAlertWithTimer}/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App;
