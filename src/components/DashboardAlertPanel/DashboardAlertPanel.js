import React, {useEffect, useState} from "react";
import Table from "../Table/Table";
import APIServer from "../../API/APIServer"
import classes from "./DashboardAlertPanel.module.css";
import {Box, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import Metric from "../Metric/Metric";

function getTimeAgo(inputDate) {
    const startDate = new Date(inputDate)
    const minutesAgo = (Date.now() - startDate) / 60000
    if (minutesAgo < 3) {
        return "just now"
    } else if (minutesAgo < 7) {
        return "a few minutes"
    } else if (minutesAgo < 10) {
        return "less 10 minutes"
    } else if (minutesAgo < 30) {
        return "less 30 minutes"
    } else if (minutesAgo < 60) {
        return "less an hour"
    } else if (minutesAgo < 120) {
        return "less an 2 hours"
    } else if (minutesAgo < 360) {
        return "less an 6 hours"
    } else if (minutesAgo < 720) {
        return "less an 12 hours"
    } else if (minutesAgo < 1440) {
        return "today"
    } else if (minutesAgo < 2880) {
        return "yesterday"
    } else if (minutesAgo < 10080) {
        return "current week"
    } else if (minutesAgo < 43200) {
        return "current month"
    }
    return "too old"
}

function onError(reason) {
    console.error(reason)
}

function DashboardAlertPanel() {
    const [rows, setRows] = useState([])

    const updateRows = function () {
        console.log("update dashboard alerts")
        const response = APIServer.getContent('/apiv1/gui/dashboard/currentProblems')
        response.then((value) => {
            let newRows = []
            value.data.forEach(jsonAlert => {
                    jsonAlert.startDate = getTimeAgo(jsonAlert.startDate)
                    newRows.push(jsonAlert)
                }
            )
            setRows(newRows)
        }, onError)
    }
    // {
    //     "operationData": "",
    //     "triggerName": "Swap usage",
    //     "triggerDescription": "Swap usage more than 50%",
    //     "host": "exporter.myproj.zabx52.node.memory.swap",
    //     "id": 27384573,
    //     "startDate": "2021-12-03T13:23:39.843774Z"
    // }
    const columns = [
        {
            field: 'startDate',
            headerName: 'Start date',
            width: 150,
            editable: false,
        },
        {
            field: 'host',
            headerName: 'Host',
            width: 600,
            editable: false,
        },
        {
            field: 'triggerName',
            headerName: 'Trigger name',
            width: 200,
            editable: false,
        },
    ];

    useEffect(
        () => {
            updateRows()
            let id = setInterval(() => {
                updateRows()
            }, 60000);
            return () => clearInterval(id);
        },
        []
    )

    return (
        <Box
            sx={{
                backgroundColor: "background.paper",
                minHeight:600,
                width: '80%',
                p: 1,
            }}
        >
                <DataGrid
                    sx={{
                        fontSize: "larger"
                    }}
                    rows={rows}
                    columns={columns}
                    pageSize={15}
                    rowsPerPageOptions={[15, 50, 100, 200]}
                    rowHeight={35}
                    disableSelectionOnClick={true}
                    getRowId={(row) => row.id}
                />
        </Box>
    );
}

export default DashboardAlertPanel;
