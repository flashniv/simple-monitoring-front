import React from 'react';
import {Trigger, TriggerStatus} from "../../types/Trigger";
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

const okTrigger = {
    p: 1,
    borderBottom: "1px solid gray",
    backgroundColor: "lightgreen"
}
const errTrigger = {
    p: 1,
    borderBottom: "1px solid gray",
    backgroundColor: "lightpink"
}
const failedTrigger = {
    borderBottom: "1px solid gray",
    backgroundColor: "red"
}
const uncheckedTrigger = {
    borderBottom: "1px solid gray",
    backgroundColor: "gray"
}

type TriggersTimeLineProps = {
    triggers: Trigger[];
}

function dateSort(a: Trigger, b: Trigger) {
    const aTime = new Date(a.lastStatusUpdate);
    const bTime = new Date(b.lastStatusUpdate);
    return bTime.getTime() - aTime.getTime();
}

function getStyle(status: TriggerStatus) {
    console.log(status.toLocaleString().localeCompare("OK") === 0)
    if (status.toLocaleString().localeCompare("OK") === 0) {
        return okTrigger;
    } else if (status.toLocaleString().localeCompare("ERROR") === 0) {
        return errTrigger;
    } else if (status.toLocaleString().localeCompare("FAILED") === 0) {
        return failedTrigger;
    }
    return uncheckedTrigger;
}

export default function TriggersTimeLine({triggers}: TriggersTimeLineProps) {
    return (
        <Grid container>
            {triggers.sort(dateSort).map(value =>
                <>
                    <Tooltip title={new Date(value.lastStatusUpdate).toLocaleString()} placement="top">
                        <Grid item xs={2} sx={getStyle(value.lastStatus)}>
                            {getTimeAgo(value.lastStatusUpdate)}
                        </Grid>
                    </Tooltip>
                    <Grid item xs={1} sx={getStyle(value.lastStatus)}>
                        {value.lastStatus}
                    </Grid>
                    <Grid item xs={9} sx={getStyle(value.lastStatus)}>
                        {value.name}
                    </Grid>
                </>
            )}
        </Grid>
    );
}