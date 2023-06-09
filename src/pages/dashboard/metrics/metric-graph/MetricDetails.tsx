import React, {useState} from 'react';
import {Box, Button, Grid, IconButton, Skeleton, Typography} from "@mui/material";
import useMetricQuery from "../../../../api/graphql/useMetricQuery";
import MetricTable from "./MetricTable";
import MetricGraph from "./MetricGraph";
import SyncIcon from '@mui/icons-material/Sync';

type MetricGraphProps = {
    metric: number;
}

export default function MetricDetails({metric}: MetricGraphProps) {
    const [beginDiff, setBeginDiff] = useState<number>(3600);
    const [endDiff, setEndDiff] = useState<number>(0);
    const {data, loading, error, refetch} = useMetricQuery(metric, beginDiff, endDiff);

    function MetricDetailsPanel() {
        return (
            <Box
                sx={{display: "flex", justifyContent: "space-between", mb: 1}}
            >
                <Box>
                    <Button onClick={() => {
                        setBeginDiff(48 * 3600);
                        setEndDiff(24 * 3600);
                    }}>Prev day</Button>
                    <Button onClick={() => {
                        setBeginDiff(48 * 3600);
                        setEndDiff(0);
                    }}>2 days</Button>
                    <Button onClick={() => {
                        setBeginDiff(24 * 3600);
                        setEndDiff(0);
                    }}>1 day</Button>
                    <Button onClick={() => {
                        setBeginDiff(12 * 3600);
                        setEndDiff(0);
                    }}>12 hours</Button>
                    <Button onClick={() => {
                        setBeginDiff(6 * 3600);
                        setEndDiff(0);
                    }}>6 hour</Button>
                    <Button onClick={() => {
                        setBeginDiff(3 * 3600);
                        setEndDiff(0);
                    }}>3 hours</Button>
                    <Button onClick={() => {
                        setBeginDiff(3600);
                        setEndDiff(0);
                    }}>1 hour</Button>
                    <Button onClick={() => {
                        setBeginDiff(1800);
                        setEndDiff(0);
                    }}>30 min</Button>
                </Box>
                <IconButton
                    onClick={() => refetch({
                        metric,
                        beginDiff,
                        endDiff
                    })}
                >
                    <SyncIcon/>
                </IconButton>
            </Box>
        )
    }

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
                    <Typography variant={"h5"}>Metric {data?.metric.name}</Typography>
                    <MetricDetailsPanel/>
                    <MetricGraph metric={data?.metric}/>
                    <MetricTable metric={data?.metric}/>
                </>
                : <></>
            }
        </Grid>
    )
}