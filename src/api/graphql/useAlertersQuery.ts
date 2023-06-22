import {gql, useMutation, useQuery} from '@apollo/client';
import {Alerter} from "../../types/Alerter";

export interface AlertersQueryResponse {
    alerters: Alerter[];
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

// const MUTATION = gql`
//     mutation AddOrganizationMutation($name:String!){
//         createOrganization(name:$name){
//             id
//             name
//         }
//     }
// `

export default function useAlertersQuery(orgId: string) {
    return useQuery<AlertersQueryResponse>(REQUEST,{
        variables:{
            orgId:orgId
        }
    });
}

// export function useOrganizationAddMutation() {
//     return useMutation<OrganizationQueryResponse>(MUTATION);
// }
