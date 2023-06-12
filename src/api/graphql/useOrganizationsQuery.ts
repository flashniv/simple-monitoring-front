import {gql, useMutation, useQuery} from '@apollo/client';
import {Organization} from "../../types/Organization";

export interface OrganizationsQueryResponse {
    organizations: Organization[];
}
interface OrganizationQueryResponse {
    organization: Organization;
}

const REQUEST = gql`
    query {
        organizations{
            id
            name
        }
    }
`;

const MUTATION = gql`
    mutation AddOrganizationMutation($name:String!){
        createOrganization(name:$name){
            id
            name
        }
    }
`

export default function useOrganizationsQuery() {
    return useQuery<OrganizationsQueryResponse>(REQUEST);
}

export function useOrganizationAddMutation() {
    return useMutation<OrganizationQueryResponse>(MUTATION);
}
