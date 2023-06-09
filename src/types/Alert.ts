import {Trigger, TriggerStatus} from "./Trigger";
import {Organization} from "./Organization";

export type Alert = {
    id: number;
    trigger: Trigger;
    organization: Organization;
    triggerStatus: TriggerStatus;
    alertTimestamp: string;
    operationData: string;
}