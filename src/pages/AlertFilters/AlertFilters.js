import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router";
import APIServer from "../../API/APIServer";
import Table from "../../components/Table/Table";
import classes from "./AlertFilters.module.css";

function onError(reason) {
    console.error(reason)
}

function AlertFilters() {
    const [alertFilters, setAlertFilters] = useState([])

    const columns=[
        {colTitle:"Name",colName:"name"},
        {colTitle:"Expression",colName:"expression"}
    ]

    var updateAlertFilters = function () {
        console.log("update AlertFilters")
        const response = APIServer.getContent('/apiv1/gui/configuration/alertFilters/allAlertFilters')
        response.then((value) => {
            setAlertFilters(value.data)    
        }, onError)
    }

    useEffect(
        updateAlertFilters,
        []
    )

    return (
        <>
            {APIServer.isLoggedIn()
                ? <div className={classes.AlertFilters}>
                    <Table rows={alertFilters} columns={columns} />
                </div>
                : <Navigate to="/login" />
            }
        </>
    );
}

export default AlertFilters;
