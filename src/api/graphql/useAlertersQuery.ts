import {gql, useMutation, useQuery} from '@apollo/client';
import {Alerter} from "../../types/Alerter";

export interface AlertersQueryResponse {
    alerters: Alerter[];
}

export interface IAlerter {
    organizationId: string;
    minPriority: string;
    description: string;
    className: string;
    properties: string;
}

export interface AlerterQueryResponse {
    alerter: Alerter;
}

const REQUEST = gql`
    query Alerters($orgId:ID!){
        alerters(orgId:$orgId){
            id
            organization{
                id
                name
            }
            minPriority
            description
            className
            properties
        }    
    }
`;

const ADD_MUTATION = gql`
    mutation AddAlerterMutation($inputAlerter:IAlerter!){
        createAlerter(inputAlerter:$inputAlerter){
            id
        }
    }
`
const DEL_MUTATION = gql`
    mutation DelAlerterMutation($alerterId:ID!){
        deleteAlerter(alerterId:$alerterId)
    }
`
const UPDATE_MUTATION = gql`
    mutation UpdateAlerterMutation($alerterId:ID!,$inputAlerter:IAlerter!){
        updateAlerter(alerterId:$alerterId,inputAlerter:$inputAlerter){
            id
        }
    }
`

export default function useAlertersQuery(orgId: string) {
    return useQuery<AlertersQueryResponse>(REQUEST, {
        variables: {
            orgId: orgId
        }
    });
}

export function useAddAlerterMutation() {
    return useMutation<AlerterQueryResponse>(ADD_MUTATION);
}
export function useDelAlerterMutation() {
    return useMutation<string>(DEL_MUTATION);
}
export function useUpdateAlerterMutation() {
    return useMutation<AlerterQueryResponse>(UPDATE_MUTATION);
}
