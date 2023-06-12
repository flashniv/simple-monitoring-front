import React, {useState} from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import {Organization} from "../../../types/Organization";
import OrganizationConfiguration from "./OrganizationConfiguration";
import OrganizationsConfiguration from "./OrganizationsConfiguration";
import {ApolloQueryResult, OperationVariables} from "@apollo/client";
import {OrganizationsQueryResponse} from "../../../api/graphql/useOrganizationsQuery";

type ConfigurationProps = {
    organizations: Organization[],
    refetchOrgs: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<OrganizationsQueryResponse>>
}

export default function Configuration({organizations,refetchOrgs}: ConfigurationProps) {
    const [currentOrg, setCurrentOrg] = useState<Organization | undefined>();

    return (
        <Grid container m={2}>
            <OrganizationsConfiguration organizations={organizations} setCurrentOrg={setCurrentOrg} refetchOrgs={refetchOrgs}/>
            <Grid item xs={9} pl={1} pr={3}>
                {currentOrg === undefined
                    ? <Box sx={{
                        backgroundColor: "white",
                        minHeight: 900,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Typography sx={{fontSize: "xxx-large", color: "lightgray", fontWeight: "bolder"}}>
                            Please select organization
                        </Typography>
                    </Box>
                    : <OrganizationConfiguration organization={currentOrg}/>
                }
            </Grid>
        </Grid>
    );
}