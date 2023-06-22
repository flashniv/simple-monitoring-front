import {gql, useQuery} from '@apollo/client';
import {Metric} from "../../types/Metric";

interface MetricQueryResponse {
    metric: Metric;
}

const REQUEST = gql`
    query Metric($metricId:ID!,$beginDiff:Int!,$endDiff:Int!){
        metric(metricId:$metricId){
            id
            name
            parameterGroups{
                id
                parameters
                dataItems(beginDiff:$beginDiff,endDiff:$endDiff){
                    timestamp
                    value
                }
            }
        }    
    }
`;

export default function useMetricQuery(metricId: number, beginDiff: number, endDiff: number) {
    return useQuery<MetricQueryResponse>(REQUEST, {
        variables: {
            metricId,
            beginDiff,
            endDiff
        },
        pollInterval: 60000
    });
}
