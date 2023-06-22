import React from 'react';
import {Organization} from "../../../types/Organization";
import useOrganizationAccessToken, {useCreateOrganizationAccessToken} from "../../../api/graphql/useOrganizationAccessToken";
import {Box, Button, Grid, Skeleton, Typography} from "@mui/material";
import Alerters from "./Alerters";

type OrganizationConfigurationProps = {
    organization: Organization;
}

export default function OrganizationConfiguration({organization}: OrganizationConfigurationProps) {
    const {data, loading, error, refetch} = useOrganizationAccessToken(organization.id);
    const [addAccessToken, addAccessTokenProps] = useCreateOrganizationAccessToken();
    console.log(organization);
    if (loading) {
        return (
            <Skeleton variant="rectangular" height={900}/>
        );
    }
    if (error) {
        return (
            <Box sx={{
                backgroundColor: "white",
                minHeight: 900,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                Error
            </Box>
        );
    }

    function clickAddAccessToken() {
        addAccessToken({
            variables: {orgId: organization.id}
        }).then(r => {
            refetch();
        });
    }

    return (
        <Box bgcolor={"white"} p={2} minHeight={900}>
            <Typography variant={"h5"} textAlign={"center"} p={2}>
                Organization: {organization.name}
            </Typography>
            <Grid container spacing={1}>
                <Grid item xs={3} p={1}>
                    <Box  border={"1px solid gray"} p={1}>
                        <Typography variant={"h6"} textAlign={"center"} p={2}>
                            Access tokens
                        </Typography>
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Button fullWidth variant={"outlined"}
                                    disabled={addAccessTokenProps.loading}
                                    onClick={clickAddAccessToken}>Add</Button>
                        </Box>
                        {data?.organizationAccessTokens !== undefined
                            ? data?.organizationAccessTokens.map(value =>
                                <Box key={value.id} p={1} borderBottom={"1px solid gray"}>
                                    {value.id}
                                </Box>
                            )
                            : <></>
                        }
                    </Box>
                </Grid>
                <Alerters orgId={organization.id}/>
            </Grid>
        </Box>
    );
}