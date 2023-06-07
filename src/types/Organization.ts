import {Metric} from "./Metric";

export type Organization = {
    id: string;
    name: string;
    metrics: Metric[];
}