import React, {useEffect, useState} from "react";
import API from "../../API/API";
import {Alert, Grid, TableCell, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom";

/*{"id":"731efbe48892c8eb486bccb36b9a8b66",
"triggerId":"db.myproject.jenkins.certificates.vovaNew.new{}.daily",
"name":"Data not receive 24h on db.myproject.jenkins.certificates.vovaNew.new",
"description":"Check last value timestamp for 24h age",
"lastStatus":"OK",
"priority":"HIGH",
"lastStatusUpdate":"2022-08-05T03:05:17.669155Z",
"enabled":true,
"conf":""}
*/

const cellStyleHead={
    borderBottom: "1px solid darkgrey",
    cursor:"pointer",
    p: 2,
}
const cellStyleOK={
    backgroundColor: "#ccffda",
    borderBottom: "1px solid darkgrey",
    cursor:"pointer",
    p: 1,
}
const cellStyleERR={
    backgroundColor: "#ffd3cc",
    borderBottom: "1px solid darkgrey",
    cursor:"pointer",
    p: 1,
}

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

function compareDate(a, b) {
    let aDate = new Date(a.lastStatusUpdate).getTime()
    let bDate = new Date(b.lastStatusUpdate).getTime()
    if (aDate < bDate) {
        return 1;
    }
    if (aDate > bDate) {
        return -1;
    }
    return 0;
}

export default function Triggers({setAlert, setTitle}) {
    const [triggers, setTriggers] = useState(undefined);
    const navigate = useNavigate()

    function updTriggers() {
        API.getTriggers((newTriggers) => {
            setTriggers(newTriggers)
        }, (reason) => {
            setAlert(<Alert severity={"error"}>Server error!</Alert>)
        })
    }

    function rowClick(trigger) {
        navigate("/trigger/" + trigger.id)
    }

    useEffect(() => {
        setTitle("Triggers")
        updTriggers()
    }, [])

    return (
        <>
            {triggers !== undefined
                ? <Grid container>
                    <Grid item md={1} display={{xs:"none", md:"block"}} xs={false} sx={cellStyleHead} fontWeight={"bold"}>Status</Grid>
                    <Grid item md={2} display={{xs:"none", md:"block"}} xs={false} sx={cellStyleHead} fontWeight={"bold"}>Timestamp</Grid>
                    <Grid item md={9} display={{xs:"none", md:"block"}} xs={false} sx={cellStyleHead} fontWeight={"bold"}>Name</Grid>
                    {triggers.sort(compareDate).map((value) => <React.Fragment key={value.id}>
                        <Grid item md={1} xs={12} fontSize={{xs:"small", md:"large"}} sx={value.lastStatus.localeCompare("OK")===0?cellStyleOK:cellStyleERR} onClick={()=>rowClick(value)}>{value.lastStatus}</Grid>
                        <Grid item md={2} xs={12} fontSize={{xs:"small", md:"large"}} sx={value.lastStatus.localeCompare("OK")===0?cellStyleOK:cellStyleERR} onClick={()=>rowClick(value)}>{getTimeAgo(value.lastStatusUpdate)}</Grid>
                        <Grid item md={9} xs={12} fontSize={{xs:"small", md:"large"}} sx={value.lastStatus.localeCompare("OK")===0?cellStyleOK:cellStyleERR} onClick={()=>rowClick(value)}>{value.name}</Grid>
                        <Grid item md={false} xs={12} display={{xs: "block", md: "none"}} sx={{p: 1}}/>
                    </React.Fragment>)
                    }
                </Grid>
                : <></>
            }
        </>
    )
}