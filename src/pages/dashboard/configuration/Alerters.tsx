import React from 'react';
import useAlertersQuery from "../../../api/graphql/useAlertersQuery";
import {Box, Button, Grid, Skeleton, Typography} from "@mui/material";
import {Alerter} from "../../../types/Alerter";

type AlerterProps = {
    alerter: Alerter;
}
function AlerterItem({alerter}: AlerterProps) {
    if (alerter.className.includes("alerters.TelegramAlertSender")) {
        const properties:{
            token:string;
            chat_id:number;
        }=JSON.parse(alerter.properties);
        return (
            <Box borderBottom={"1px solid lightgray"} p={1} pl={2} display={"flex"}>
                <Box mr={2}>TG</Box>
                <Box mr={2}>{alerter.minPriority}</Box>
                <Box mr={2}>My super mega description</Box>
                <Box mr={2}>Token: {properties.token}</Box>
                <Box>Chat: {properties.chat_id}</Box>
            </Box>
        );
    }
    return (
        <Box>
            {alerter.className}
        </Box>
    );
}

type AlertersProps = {
    orgId: string
}

export default function Alerters({orgId}: AlertersProps) {
    const {data, loading, error} = useAlertersQuery(orgId);
    if (loading) {
        return (
            <Skeleton variant="rectangular" width={1000} height={500}/>
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
    return (
        <Grid item xs={9} p={1}>
            <Box border={"1px solid gray"} p={1} minHeight={600}>
                <Typography variant={"h6"} textAlign={"center"} p={2}>
                    Alerters
                </Typography>
                <Button variant={"outlined"} sx={{mr:2}}>Add TG</Button>
                <Button variant={"outlined"}>Add Slack</Button>
                {data?.alerters !== undefined
                    ? data.alerters.map(value => <AlerterItem key={value.id} alerter={value}/>)
                    : <>Error</>
                }
            </Box>
        </Grid>
    );
}