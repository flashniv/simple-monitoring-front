import * as React from 'react';
import Title from '../Title';
import {Trigger} from "../../../types/Trigger";
import TriggerItemWithOrg from "./TriggerItemWithOrg";

function triggerFilter(value: Trigger) {
    const curTimestamp = new Date().getTime() - 43200000;
    const triggerTime = new Date(value.lastStatusUpdate).getTime();
    return (triggerTime > curTimestamp);
}
function dateSort(a: Trigger, b: Trigger) {
    const aTime = new Date(a.lastStatusUpdate);
    const bTime = new Date(b.lastStatusUpdate);
    return bTime.getTime() - aTime.getTime();
}

type AlertsSummaryProps = {
    triggers: Trigger[];
}
export default function AlertsSummary({triggers}: AlertsSummaryProps) {
    return (
        <React.Fragment>
            <Title>Triggers</Title>
            {triggers.filter(triggerFilter).sort(dateSort).map(value => <TriggerItemWithOrg key={value.id} triggerRO={value}/>)}
        </React.Fragment>
    );
}
