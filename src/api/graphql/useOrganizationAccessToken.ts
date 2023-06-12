import {gql, useMutation, useQuery} from '@apollo/client';
import {AccessToken} from "../../types/AccessToken";

interface OrganizationAccessTokensQueryResponse {
    organizationAccessTokens: AccessToken[];
}

const REQUEST = gql`
    query OrganizationAccessTokens($orgId:ID!){
        organizationAccessTokens(orgId:$orgId){
            id
            organization{
                id
                name
            }
        }    
    }
`;

const MUTATION = gql`
    mutation CreateOrganizationAccessToken($orgId:ID!){
        createOrganizationAccessToken(orgId:$orgId)
    }
`

export default function useOrganizationAccessToken(orgId: string) {
    return useQuery<OrganizationAccessTokensQueryResponse>(REQUEST, {
        variables: {
            orgId: orgId
        }
    });
}

export function useCreateOrganizationAccessToken() {
    return useMutation<string>(MUTATION);
}
