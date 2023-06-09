import {Organization} from "./Organization";
import {Alert} from "./Alert";

export enum TriggerStatus {
    OK,
    FAILED,
    ERROR,
    UNCHECKED
}

export enum TriggerPriority {
    DEBUG,
    NOT_CLASSIFIED,
    INFO,
    AVERAGE,
    WARNING,
    HIGH,
    DISASTER
}

export type Trigger = {
    id: number;
    organization: Organization;
    name: string;
    description: string;
    triggerId: string;
    lastStatus: TriggerStatus;
    priority: TriggerPriority
    lastStatusUpdate: string;
    enabled: boolean;
    suppressedScore: number;
    muted: boolean;
    conf: string;
    alerts: Alert[];
}
