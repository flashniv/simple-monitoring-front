import {useEffect, useState} from "react";
import APIServer from "../../API/APIServer";
import {Box, Button, TextField} from "@mui/material";
import AlertFiltersTable from "../../components/AlertFiltersTable/AlertFiltersTable";
import * as React from "react";

function onError(reason) {
    console.error(reason)
}

function AlertFilters() {
    const [alertFilters, setAlertFilters] = useState([])
    const [name,setName]=useState("")
    const [expr,setExpr]=useState("")

    const onAdd = function () {
        const data={
            name: name,
            expression: expr
        }
        const response = APIServer.postContent('/apiv1/gui/configuration/alertFilters/addAlertFilter', data)
        response.then(() => {
            updateAlertFilters()
            setExpr("")
            setName("")
            console.log("Add success")
        }, onError)
    }

    const updateAlertFilters = function () {
        console.log("update AlertFilters")
        const response = APIServer.getContent('/apiv1/gui/configuration/alertFilters/allAlertFilters')
        response.then((value) => {
            setAlertFilters(value.data)
        }, onError)
    }

    useEffect(
        updateAlertFilters,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return (
        <>
            <Box
                sx={{
                    display:"flex",
                    alignItems:"center",
                    backgroundColor:"white",
                    p:1,
                    mb:1
                }}
            >
                <TextField
                    id="outlined-required"
                    label="Name"
                    sx={{
                        width: 300,
                        mr: 2
                    }}
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
                <TextField
                    id="outlined-required"
                    label="Expression"
                    sx={{
                        width: 300,
                        mr: 2
                    }}
                    value={expr}
                    onChange={(e) => {
                        setExpr(e.target.value)
                    }}
                />
                <Button variant="contained" onClick={onAdd} sx={{height: 35, mr:2}}>Add</Button>
            </Box>
            <Box
                sx={{
                    backgroundColor:"white",
                    minHeight:900,
                    p:2
                }}
            >
                <AlertFiltersTable rows={alertFilters} updateAlertFilters={updateAlertFilters} />
            </Box>
        </>
    );
}

export default AlertFilters;
