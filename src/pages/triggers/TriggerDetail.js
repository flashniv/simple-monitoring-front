import React, {useEffect, useState} from "react";
import {Alert, Backdrop, Box, CircularProgress, Grid, Tooltip, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import API from "../../API/API";

/*{"alerts":
[{"alertTimestamp":"2022-08-08T07:46:05.461760Z","id":1,"trigger":{"triggerId":"db.test.trigger","name":"Test trigger","description":"","lastStatusUpdate":"2022-08-08T07:46:05.445203Z","conf":"","id":"de884fcf16b2f1f9b233307a7f6678f1","priority":"AVERAGE","lastStatus":"OK","enabled":true}}],
"triggerId":"db.test.trigger",
"name":"Test trigger",
"description":"",
"lastStatusUpdate":"2022-08-08T07:46:05.445203Z",
"conf":"",
"id":"de884fcf16b2f1f9b233307a7f6678f1",
"priority":"AVERAGE",
"lastStatus":"OK",
"enabled":true}*/
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
    let aDate = new Date(a.alertTimestamp).getTime()
    let bDate = new Date(b.alertTimestamp).getTime()
    if (aDate < bDate) {
        return 1;
    }
    if (aDate > bDate) {
        return -1;
    }
    return 0;
}

const cellStyleLeft = {
    borderBottom: "1px solid darkgrey",
    p: 1,
    fontWeight: "bold",
    textAlign: "right"
}
const cellStyleRight = {
    borderBottom: "1px solid darkgrey",
    p: 1
}
const cellStyleAlertOK = {
    backgroundColor: "#ccffda",
    borderBottom: "1px solid darkgrey",
    p: 1
}
const cellStyleAlertERR = {
    backgroundColor: "#ffd3cc",
    borderBottom: "1px solid darkgrey",
    p: 1
}

export default function TriggerDetail({setAlert, setTitle}) {
    const [trigger, setTrigger] = useState(undefined)
    const {triggerId} = useParams();

    let cellStatusStyle = Object.assign({}, cellStyleRight);
    if (trigger !== undefined) cellStatusStyle.backgroundColor = trigger.lastStatus.localeCompare("OK") === 0 ? "#ccffda" : "#ffd3cc"

    useEffect(() => {
        setTitle('Trigger detail')
        API.getTriggerDetail(triggerId, (newTrigger) => {
            setTrigger(newTrigger)
        }, (reason) => {
            setAlert(<Alert severity={"error"}>Server error!</Alert>)
        })
    }, [])

    return (
        <>
            {trigger !== undefined
                ? <>
                    <Typography variant={"h5"} textAlign={"center"} p={2}>
                        Trigger {trigger.triggerId}
                    </Typography>
                    <Grid container>
                        <Grid item md={3} xs={12} sx={cellStyleLeft}>Status</Grid>
                        <Grid item md={9} xs={12} sx={cellStatusStyle}>{trigger.lastStatus}</Grid>
                        <Grid item md={3} xs={12} sx={cellStyleLeft}>Timestamp</Grid>
                        <Grid item md={9} xs={12}
                              sx={cellStyleRight}>{getTimeAgo(trigger.lastStatusUpdate)} ({new Date(trigger.lastStatusUpdate).toLocaleString()})</Grid>
                        <Grid item md={3} xs={12} sx={cellStyleLeft}>Name</Grid>
                        <Grid item md={9} xs={12} sx={cellStyleRight}>{trigger.name}</Grid>
                        <Grid item md={3} xs={12} sx={cellStyleLeft}>Description</Grid>
                        <Grid item md={9} xs={12} sx={cellStyleRight}>{trigger.description}</Grid>
                        <Grid item md={3} xs={12} sx={cellStyleLeft}>Trigger ID</Grid>
                        <Grid item md={9} xs={12} sx={cellStyleRight}>{trigger.triggerId}</Grid>
                        <Grid item md={3} xs={12} sx={cellStyleLeft}>Conf</Grid>
                        <Grid item md={9} xs={12} sx={cellStyleRight}>{trigger.conf}</Grid>
                        <Grid item md={3} xs={12} sx={cellStyleLeft}>Enabled</Grid>
                        <Grid item md={9} xs={12} sx={cellStyleRight}>{'' + trigger.enabled}</Grid>
                    </Grid>
                    <Typography variant={"h5"} textAlign={"center"} p={2}>
                        Alerts
                    </Typography>
                    <Grid container>
                        {trigger.alerts.sort(compareDate).map((alert) => <React.Fragment key={alert.id}>
                                <Grid item md={6} xs={6}
                                      sx={alert.triggerStatus.localeCompare("OK") === 0 ? cellStyleAlertOK : cellStyleAlertERR}>
                                    <Tooltip title={new Date(alert.alertTimestamp).toLocaleString()} placement="top-start">
                                        <Box>{getTimeAgo(alert.alertTimestamp)}</Box>
                                    </Tooltip>
                                </Grid>
                                <Grid item md={6} xs={6}
                                      sx={alert.triggerStatus.localeCompare("OK") === 0 ? cellStyleAlertOK : cellStyleAlertERR}>
                                    {alert.triggerStatus}
                                </Grid>
                            </React.Fragment>
                        )}
                    </Grid>
                </>
                :  <Backdrop open={true} sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            }
        </>
    )
}