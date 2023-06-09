import {gql, useQuery} from '@apollo/client';
import {Trigger} from "../../types/Trigger";

interface TriggersQueryResponse {
    triggers: Trigger[];
}

const REQUEST = gql`
    query Triggers($orgId:ID!,$page:Int!,$size:Int!){
        triggers(orgId:$orgId,page:$page,size:$size){
            id
            name
            description
            triggerId
            lastStatus
            priority
            lastStatusUpdate
            enabled
            suppressedScore
            muted
            conf
            alerts{
                id
                alertTimestamp
                triggerStatus
                operationData
            }
        }    
    }
`;

export default function useTriggersQuery(orgId: string) {
    return useQuery<TriggersQueryResponse>(REQUEST, {
        variables: {
            orgId: orgId,
            page: 0,
            size: 8000
        }
    });
}
