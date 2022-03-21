import React, {useEffect, useState} from "react";
import APIServer from "../../API/APIServer";
import classes from "./History.module.css";
import {DataGrid} from "@mui/x-data-grid";
import {Box} from "@mui/material";

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
        return "current mounth"
    }
    return "too old"
}

function getDuration(startTime, stopTime) {
    if (stopTime === undefined) return ""
    const startDate = new Date(startTime)
    const stopDate = new Date(stopTime)

    const minutesAgo = (stopDate - startDate) / 60000
    if (minutesAgo < 60) {
        return "" + Math.round(minutesAgo) + "m"
    } else if (minutesAgo < 1440) {
        return "" + Math.round(minutesAgo / 60) + "h"
    }
    return "" + Math.round(minutesAgo / 1440) + "d"

}

function onError(reason) {
    console.error(reason)
}

/*duration: "(2m)"
host: "exporter.collaborator.collaborator-prod.node.disk./"
id: 464224716
isFiltered: false
operationData: ""
startDate: "2022-03-21T07:26:18.074132Z"
stopDate: "2022-03-21T07:28:18.054552Z"
timeAgo: "less an 12 hours"
triggerDescription: "Disk user more than 85%"
triggerName: "Disk free 85%"
*/

export default function History() {
    const [onlyAlerted, setOnlyAlerted] = useState(false)
    const [onlyFiltered, setOnlyFiltered] = useState(true)
    const [filter, setFilter] = useState("")
    const [alerts, setAlerts] = useState([])

    const columns = [
        {
            field: 'timeAgo',
            headerName: 'Time ago',
            width: 180,
            editable: false,
        },
        {
            field: 'duration',
            headerName: 'Duration',
            width: 100,
            editable: false,
        },
        {
            field: 'host',
            headerName: 'Host',
            width: 700,
            editable: false,
        },
        {
            field: 'triggerName',
            headerName: 'Trigger name',
            width: 200,
            editable: false,
        },
    ];

    const updateHistory = function () {
        console.log("update History")
        const response = APIServer.getContent('/apiv1/gui/history/allProblems')
        response.then((value) => {
            setAlerts(value.data)
        }, onError)
    };

    const getFiltered = function () {
        let res = []
        const filtered = alerts.filter(alert => {
                if (onlyFiltered && alert.isFiltered) {
                    return false
                }
                if (onlyAlerted && alert.stopDate != null) {
                    return false
                }
                if (filter.localeCompare("") !== 0) {
                    return alert.host.includes(filter)
                }

                return true
            }
        )
        filtered.map((value => {
            value.timeAgo = getTimeAgo(value.startDate)
            value.duration = getDuration(value.startDate, value.stopDate)
            res.push(value)
        }))
        return res
    };

    const clearFilter = function () {
        setOnlyAlerted(false)
        setOnlyFiltered(true)
        setFilter("")
    };

    useEffect(
        () => {
            updateHistory()
            let id = setInterval(() => {
                updateHistory()
            }, 60000);
            return () => clearInterval(id);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return (
        <>
            <div className={classes.HistoryFilter}>
                <div className={classes.FilterDiv}>
                    <input id="onlyFiltered" className={classes.HistoryFilterInputCheck}
                           checked={onlyFiltered} type="checkbox" onChange={() => setOnlyFiltered(!onlyFiltered)}/>
                    <label htmlFor="onlyFiltered">Filter</label>
                    <input id="onlyAlerted" className={classes.HistoryFilterInputCheck}
                           checked={onlyAlerted} type="checkbox" onChange={() => setOnlyAlerted(!onlyAlerted)}/>
                    <label htmlFor="onlyAlerted">Only alerted</label>
                </div>
                <div className={classes.FilterDiv}>
                    <input className={classes.HistoryFilterInputText} value={filter} placeholder="Search..."
                           type="text" onChange={(e) => {
                        setFilter(e.target.value)
                    }}/>
                    <button className={classes.HistoryFilterButton} onClick={clearFilter}>Clear</button>
                </div>
            </div>
            <Box
                sx={{
                    height: 570,
                    backgroundColor: "background.paper"
                }}
            >
                {!alerts.length
                    ? <div>Loading...</div>
                    : <DataGrid
                        sx={{
                            fontSize: "larger"
                        }}
                        rows={getFiltered()}
                        columns={columns}
                        pageSize={13}
                        rowsPerPageOptions={[13, 50, 100, 200]}
                        rowHeight={35}
                        disableSelectionOnClick={true}
                        getRowId={(row) => row.id}
                    />
                }
            </Box>
        </>
    );
}
