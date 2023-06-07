import React from 'react';
import {Grid, Paper, Skeleton, Typography} from "@mui/material";
import useMetricQuery from "../../../api/graphql/useMetricQuery";

type MetricGraphProps = {
    metric: number;
}

export default function MetricGraph({metric}: MetricGraphProps) {
    const {data, loading, error} = useMetricQuery(metric);
    if (loading) {
        return (
            <Grid item xs={9}>
                <Skeleton variant="rectangular" height={"49vh"} sx={{mb: 1}}/>
                <Skeleton variant="rectangular" height={"50vh"}/>
            </Grid>
        )
    }
    return (
        <>tyt</>
    )
}