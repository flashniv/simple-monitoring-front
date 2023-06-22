import {Organization} from "./Organization";
import {TriggerPriority} from "./Trigger";

export type Alerter = {
    id: number;
    organization: Organization;
    minPriority: TriggerPriority;
    description: string;
    className: string;
    properties: string;
}