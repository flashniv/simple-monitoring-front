import * as React from 'react';
import Title from '../Title';
import {Trigger} from "../../../types/Trigger";
import {Box, IconButton} from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";

function getLastAlertTriggers(triggers: Trigger[]) {
    const curTimestamp = new Date().getTime() - 43200000;
    const filteredTriggers = triggers.filter(value => {
        const triggerTime = new Date(value.lastStatusUpdate).getTime();
        return (triggerTime > curTimestamp) && value.lastStatus.toLocaleString().localeCompare("OK") !== 0;
    });
    return filteredTriggers.length;
}

type ShortSummaryProps = {
    triggers: Trigger[];
    refetch(variables?: any): any;
}
export default function ShortSummary({triggers, refetch}: ShortSummaryProps) {
    const alertCount=getLastAlertTriggers(triggers);
    return (
        <React.Fragment>
            <Box display={"flex"} justifyContent={"space-between"}>
                <Title>Current Alerts</Title>
                <IconButton onClick={() => refetch()}>
                    <SyncIcon/>
                </IconButton>
            </Box>
            <Box height={170} sx={{display: "flex", alignItems: "center", justifyContent: "center", fontSize: "80px"}} color={alertCount>0?"indianred":"darkgray"}>
                {alertCount}
            </Box>
        </React.Fragment>
    );
}
