import React from 'react';
import {Alert} from "../../types/Alert";
import {Grid} from "@mui/material";

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

function AlertItem(alert: Alert) {
    return (
        <Grid container columns={{xs: 3, sm: 6, md: 12, lg: 12}}>
            <Grid item xs={3}>
                {getTimeAgo(alert.alertTimestamp)}
            </Grid>
            <Grid item xs={3}>
                {alert.triggerStatus}
            </Grid>

        </Grid>
    );
}

type AlertsProps = {
    alerts: Alert[];
}
export default function Alerts({alerts}: AlertsProps) {
    alerts.map(value => {
        console.log(value.alertTimestamp);
    })
    return (
        <>
            {alerts.map(value =>
                <AlertItem id={value.id} trigger={value.trigger} organization={value.organization}
                       triggerStatus={value.triggerStatus} alertTimestamp={value.alertTimestamp}
                       operationData={value.operationData}/>
            )}
        </>
    );
}