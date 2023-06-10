import React from 'react';
import {Trigger, TriggerStatus} from "../../types/Trigger";
import {Box, Button, Grid} from "@mui/material";

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
    display: "flex",
    alignItems: "center",
    border: "1px solid gray",
    mb: 1,
    backgroundColor: "lightgreen"
}
const errTrigger = {
    display: "flex",
    alignItems: "center",
    border: "1px solid gray",
    mb: 1,
    backgroundColor: "lightpink"
}
const failedTrigger = {
    display: "flex",
    alignItems: "center",
    border: "1px solid gray",
    mb: 1,
    backgroundColor: "red"
}
const uncheckedTrigger = {
    display: "flex",
    alignItems: "center",
    border: "1px solid gray",
    mb: 1,
    backgroundColor: "gray"
}

function getStyle(status: TriggerStatus) {
    if (status.toLocaleString().localeCompare("OK") === 0) {
        return okTrigger;
    } else if (status.toLocaleString().localeCompare("ERROR") === 0) {
        return errTrigger;
    } else if (status.toLocaleString().localeCompare("FAILED") === 0) {
        return failedTrigger;
    }
    return uncheckedTrigger;
}

type TriggerProps = {
    trigger: Trigger;
}
export default function TriggerItem({trigger}: TriggerProps) {
    return (
        <Grid
            container
            columns={{xs: 1, sm: 1, md: 12, lg: 12}}
            p={1}
            sx={getStyle(trigger.lastStatus)}
        >
            <Grid item xs={2} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Box>{getTimeAgo(trigger.lastStatusUpdate)}</Box>
                <Box
                    sx={{
                        pr: {xs: 0, md: 2}
                    }}
                >{trigger.lastStatus}</Box>
            </Grid>
            <Grid item xs={9} sx={{wordBreak:"break-word"}}>
                {trigger.name}
            </Grid>
            <Grid item xs={1} display={"flex"} justifyContent={"right"}>
                <Button size="small">Details</Button>
            </Grid>
        </Grid>
    );
}