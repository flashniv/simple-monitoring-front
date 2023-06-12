import React from 'react';
import {Alert} from "../../types/Alert";
import {Grid, Tooltip} from "@mui/material";

function getTimeAgo(inputDate: string) {
    const startDate = new Date(inputDate)
    const minutesAgo = (Date.now() - startDate.getTime()) / 60000
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

function getDuration(time: number) {
    if (time < 60) {
        return "(" + Math.trunc(time) + "s)";
    }
    if (time < 3600) {
        return "(" + Math.trunc(time / 60) + "m)";
    }
    if (time < 86400) {
        return "(" + Math.trunc(time / 3600) + "h)";
    }
    return "(" + Math.trunc(time / 86400) + "d)";
}

const okAlert = {
    p: 1,
    borderBottom: "1px solid gray",
    backgroundColor: "lightgreen"
}
const errAlert = {
    p: 1,
    borderBottom: "1px solid gray",
    backgroundColor: "lightpink"
}

function AlertItem({alert, index, array}: { alert: Alert, index: number, array: Alert[] }) {
    let delay = "";
    let nextTimestamp=new Date().getTime();
    if (index > 0) {
        nextTimestamp = new Date(array[index - 1].alertTimestamp).getTime();
    }
    const currentTimestamp = new Date(alert.alertTimestamp).getTime();
    delay = getDuration((nextTimestamp - currentTimestamp) / 1000);

    return (
        <Grid container columns={{xs: 6, sm: 6, md: 12, lg: 12}}>
            <Grid item xs={3} sx={alert.triggerStatus.toLocaleString().localeCompare("OK") === 0 ? okAlert : errAlert}>
                <Tooltip title={new Date(alert.alertTimestamp).toLocaleString()}>
                    <span>{getTimeAgo(alert.alertTimestamp)}</span>
                </Tooltip>
            </Grid>
            <Grid item xs={3} sx={alert.triggerStatus.toLocaleString().localeCompare("OK") === 0 ? okAlert : errAlert}>
                {alert.triggerStatus} {delay}
            </Grid>

        </Grid>
    );
}

type AlertsProps = {
    alerts: Alert[];
}
export default function Alerts({alerts}: AlertsProps) {
    return (
        <>
            {alerts.map((value, index, array) =>
                <AlertItem key={value.id} alert={value} index={index} array={array}/>
            )}
        </>
    );
}