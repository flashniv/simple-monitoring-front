import React from 'react';
import {Grid, Paper} from "@mui/material";

export default function MetricGraph() {
    return(
        <Grid item xs={9}>
            <Paper
                sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height: "100vh"
                }}
            >
                graph
            </Paper>
        </Grid>
    )
}