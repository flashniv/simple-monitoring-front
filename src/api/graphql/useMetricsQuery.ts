import {gql, useQuery} from '@apollo/client';
import {Metric} from "../../types/Metric";

interface MetricsQueryResponse {
    metrics: Metric[];
}

const REQUEST = gql`
    query Metrics($orgId:ID!,$page:Int!,$size:Int!){
        metrics(orgId:$orgId,page:$page,size:$size){
            id
            name
        }    
    }
`;

export default function useMetricsQuery(orgId:string) {
    return useQuery<MetricsQueryResponse>(REQUEST,{
        variables:{
            orgId:orgId,
            page:0,
            size:8000
        }
    });
}
