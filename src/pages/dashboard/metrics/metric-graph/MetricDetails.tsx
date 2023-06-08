import React from 'react';
import {Grid, Skeleton} from "@mui/material";
import useMetricQuery from "../../../../api/graphql/useMetricQuery";
import MetricTable from "./MetricTable";
import MetricGraph from "./MetricGraph";

type MetricGraphProps = {
    metric: number;
}

export default function MetricDetails({metric}: MetricGraphProps) {
    const {data, loading, error} = useMetricQuery(metric);
    if (loading) {
        return (
            <Grid item xs={9}>
                <Skeleton variant="rectangular" height={"49vh"} sx={{mb: 1}}/>
                <Skeleton variant="rectangular" height={"50vh"}/>
            </Grid>
        )
    }
    if (error) {
        return (
            <Grid item xs={9}>
                Error...
            </Grid>
        )
    }
    return (
        <Grid item xs={9}>
            {data?.metric !== undefined
                ? <>
                    <MetricGraph metric={data?.metric}/>
                    <MetricTable metric={data?.metric}/>
                </>
                : <></>
            }
        </Grid>
    )
}