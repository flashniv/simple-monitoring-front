import {gql, useMutation, useQuery} from '@apollo/client';
import {Trigger, TriggerPriority} from "../../types/Trigger";

interface TriggersQueryResponse {
    triggers: Trigger[];
}

export interface ITrigger {
    organizationId: string;
    name: string;
    description: string;
    triggerId: string;
    priority: TriggerPriority;
    enabled: boolean;
    suppressedScore: number;
    muted: boolean;
    conf: string;
}

interface TriggerQueryResponse {
    trigger: Trigger;
}

const REQUEST = gql`
    query Triggers($orgId:ID!,$page:Int!,$size:Int!){
        triggers(orgId:$orgId,page:$page,size:$size){
            id
            name
            description
            organization{
                id
                name
            }
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

const MUTATION = gql`
    mutation TriggerMutation($triggerId:ID!,$inputTrigger:ITrigger!){
        updateTrigger(triggerId:$triggerId,inputTrigger:$inputTrigger){
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
        }
    }
`

export default function useTriggersQuery(orgId: string) {
    return useQuery<TriggersQueryResponse>(REQUEST, {
        variables: {
            orgId: orgId,
            page: 0,
            size: 8000
        }
    });
}

export function useTriggerMutation() {
    return useMutation<TriggerQueryResponse>(MUTATION);
}
