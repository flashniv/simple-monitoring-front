import React, {useState} from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import {Organization} from "../../../types/Organization";
import OrganizationConfiguration from "./OrganizationConfiguration";

type ConfigurationProps = {
    organizations: Organization[]
}

export default function Configuration({organizations}: ConfigurationProps) {
    const [currentOrg, setCurrentOrg] = useState<Organization | undefined>();

    return (
        <Grid container m={2}>
            <Grid item xs={3} sx={{backgroundColor: "white", minHeight: 900}} p={1}>
                <Typography variant={"h5"} textAlign={"center"} p={2}>
                    Organizations
                </Typography>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Button fullWidth variant={"outlined"}>Add</Button>
                </Box>
                {organizations.map(value =>
                    <Box display={"flex"} justifyContent={"space-between"} borderBottom={"1px solid gray"}>
                        <Box display={"flex"} alignItems={"center"}>{value.name}</Box>
                        <Button onClick={() => setCurrentOrg(value)}>Details</Button>
                    </Box>
                )}
            </Grid>
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