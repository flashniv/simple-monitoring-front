import {gql, useQuery} from '@apollo/client';
import {Metric} from "../../types/Metric";

interface MetricsQueryResponse {
    metrics: Metric[];
}

const REQUEST = gql`
    query Metrics($orgId:ID!){
        metrics(orgId:$orgId){
            id
            name
        }    
    }
`;

export default function useMetricsQuery(orgId:string) {
    return useQuery<MetricsQueryResponse>(REQUEST,{
        variables:{
            orgId
        }
    });
}
