import * as React from 'react';
import Title from '../Title';
import {Trigger} from "../../../types/Trigger";
import TriggerItemWithOrg from "./TriggerItemWithOrg";
import {Box, Checkbox, TextField} from "@mui/material";
import {useState} from "react";

function dateSort(a: Trigger, b: Trigger) {
    const aTime = new Date(a.lastStatusUpdate);
    const bTime = new Date(b.lastStatusUpdate);
    return bTime.getTime() - aTime.getTime();
}

type AlertsSummaryProps = {
    triggers: Trigger[];
}
export default function AlertsSummary({triggers}: AlertsSummaryProps) {
    const [filter,setFilter] = useState("");
    const [onlyAlerts,setOnlyAlerts] = useState(false);

    function filterFunc(trigger: Trigger) {
        if (trigger.lastStatus.toLocaleString().localeCompare("OK") === 0 && onlyAlerts) return false;
        if (!(trigger.organization.name+' '+trigger.name).includes(filter)) return false;
        return true;
    }

    return (
        <React.Fragment>
            <Box pb={1} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Title>Triggers</Title>
                <Box display={"flex"} alignItems={"center"}>
                    <TextField
                        label={"Search"}
                        value={filter}
                        onChange={event => setFilter(event.target.value)}
                        variant={"standard"}
                        sx={{width:350}}
                    />
                    Only alerted
                    <Checkbox
                        value={onlyAlerts}
                        onChange={event => setOnlyAlerts(event.target.checked)}
                    />
                </Box>
            </Box>
            {triggers.filter(filterFunc).sort(dateSort).map(value => <TriggerItemWithOrg key={value.id} triggerRO={value}/>)}
        </React.Fragment>
    );
}
