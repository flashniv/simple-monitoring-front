import {gql, useQuery} from '@apollo/client';
import {Organization} from "../../types/Organization";

interface OrganizationsQueryResponse {
    organizations: Organization[];
}

const REQUEST = gql`
    query {
        organizations{
            id
            name
        }
    }
`;

export default function useOrganizationsQuery() {
    return useQuery<OrganizationsQueryResponse>(REQUEST);
}
