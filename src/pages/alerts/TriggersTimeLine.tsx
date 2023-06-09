import React from 'react';
import {Trigger, TriggerStatus} from "../../types/Trigger";
import {Box, Button, Card, CardActions, CardContent, Grid, Typography} from "@mui/material";

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
    mr: 1,
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: "#10bd10"
}
const errTrigger = {
    mr: 1,
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: "red"
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

        <Grid container columns={{xs: 3, sm: 6, md: 12, lg: 12}}>
            {triggers.sort(dateSort).map(value =>
                <Grid xs={3}>
                    <Box p={1}>
                        <Card
                            sx={
                                value.lastStatus.toLocaleString().localeCompare("OK") === 0
                                    ? {backgroundColor: "#d5ffce"}
                                    : {backgroundColor: "#ffcece"}
                            }
                        >
                            <CardContent>
                                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        {getTimeAgo(value.lastStatusUpdate)}
                                    </Typography>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        {new Date(value.lastStatusUpdate).toLocaleString()}
                                    </Typography>
                                </Box>
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Box sx={getStyle(value.lastStatus)}/>
                                    <Typography variant="h6" component="div">
                                        {value.lastStatus}
                                    </Typography>
                                </Box>
                                <Typography sx={{mb: 1.5, minHeight: 70, wordBreak: "break-all"}}
                                            color="text.secondary">
                                    {value.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>
            )}
        </Grid>
    );
}