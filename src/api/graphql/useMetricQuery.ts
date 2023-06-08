import {gql, useQuery} from '@apollo/client';
import {Metric} from "../../types/Metric";

interface MetricQueryResponse {
    metric: Metric;
}

const REQUEST = gql`
    query Metric($metricId:ID!){
        metric(metricId:$metricId){
            id
            name
            parameterGroups{
                id
                parameters
                dataItems{
                    timestamp
                    value
                }
            }
        }    
    }
`;

export default function useMetricQuery(metricId:number) {
    return useQuery<MetricQueryResponse>(REQUEST,{
        variables:{
            metricId
        }
    });
}
