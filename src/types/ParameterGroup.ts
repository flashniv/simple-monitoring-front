import {Metric} from "./Metric";
import {DataItem} from "./DataItem";

export type ParameterGroup = {
    id: number;
    parameters: string;
    metric: Metric;
    dataItems: DataItem[];
}
