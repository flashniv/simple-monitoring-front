import React from 'react';
import {Organization} from "../../../types/Organization";
import useOrganizationAccessToken, {useCreateOrganizationAccessToken} from "../../../api/graphql/useOrganizationAccessToken";
import {Box, Button, Grid, Skeleton, Typography} from "@mui/material";

type OrganizationConfigurationProps = {
    organization: Organization;
}

export default function OrganizationConfiguration({organization}: OrganizationConfigurationProps) {
    const {data, loading, error, refetch} = useOrganizationAccessToken(organization.id);
    const [addAccessToken, addAccessTokenProps] = useCreateOrganizationAccessToken();

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
            <Grid container>
                <Grid item xs={3}>
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
                </Grid>
            </Grid>
        </Box>
    );
}