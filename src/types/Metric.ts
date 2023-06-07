import {Organization} from "./Organization";
import {ParameterGroup} from "./ParameterGroup";

export type Metric = {
    id: number;
    name: string;
    organization: Organization;
    parameterGroups: ParameterGroup[];
}
