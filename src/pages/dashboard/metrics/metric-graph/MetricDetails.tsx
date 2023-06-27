import React, {useEffect, useState} from 'react';
import {Box, Button, Grid, IconButton, Skeleton, Typography} from "@mui/material";
import useMetricQuery from "../../../../api/graphql/useMetricQuery";
import MetricTable from "./MetricTable";
import MetricGraph from "./MetricGraph";
import SyncIcon from '@mui/icons-material/Sync';
import {Metric} from "../../../../types/Metric";
import {ParameterGroup} from "../../../../types/ParameterGroup";
import {DataItem} from "../../../../types/DataItem";

function getMultiplier(input: number) {
    for (var i = 0; input > 9000; i++) {
        input /= 1000;
    }
    return i;
}

type MetricGraphProps = {
    metric: number;
}

export default function MetricDetails({metric}: MetricGraphProps) {
    const [beginDiff, setBeginDiff] = useState<number>(3600);
    const [endDiff, setEndDiff] = useState<number>(0);
    const [multiplier, setMultiplier] = useState<number>(1);
    const [calcMetric, setCalcMetric] = useState<Metric | undefined>();
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

    useEffect(() => {
        const inputMetric = data?.metric;
        if (inputMetric !== undefined) {
            let outMetric: Metric = {
                id: inputMetric.id,
                name: inputMetric.name,
                organization: inputMetric.organization,
                parameterGroups: []
            }
            let max: number | undefined = undefined;
            inputMetric.parameterGroups.map(parameterGroup => {
                parameterGroup.dataItems.map(dataItem => {
                    if (max === undefined) {
                        max = dataItem.value;
                    } else if (max < dataItem.value) {
                        max = dataItem.value;
                    }
                });
            });
            const mul = getMultiplier(max === undefined ? 0 : max);
            inputMetric.parameterGroups.map(parameterGroup => {
                const outputPG:ParameterGroup={
                    metric:parameterGroup.metric,
                    id:parameterGroup.id,
                    parameters:parameterGroup.parameters,
                    dataItems:[]
                }
                parameterGroup.dataItems.map(dataItem => {
                    const outDI:DataItem={
                        value:dataItem.value/Math.pow(1000,mul),
                        timestamp:dataItem.timestamp
                    }
                    outputPG.dataItems.push(outDI);
                });
                outMetric.parameterGroups.push(outputPG);
            });
            setMultiplier(mul);
            setCalcMetric(outMetric);
        }
    }, [data?.metric]);

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
            {calcMetric !== undefined
                ? <>
                    <Typography variant={"h5"}>Metric {calcMetric.name}</Typography>
                    <MetricDetailsPanel/>
                    <MetricGraph metric={calcMetric} />
                    <MetricTable metric={calcMetric} multiplier={multiplier}/>
                </>
                : <></>
            }
        </Grid>
    )
}