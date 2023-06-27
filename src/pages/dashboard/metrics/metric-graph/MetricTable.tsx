import React from 'react';
import {Grid} from "@mui/material";
import {Metric} from "../../../../types/Metric";
import {DataItem} from "../../../../types/DataItem";
import {ParameterGroup} from "../../../../types/ParameterGroup";

const multipliers = ["", "K", "M", "G", "T", "E", "P"]

const headStyle = {
    fontWeight: "bold",
    textAlign: "left",
    borderBottom: "1px solid gray"
}
const bodyStyle = {
    borderBottom: "1px solid gray"
}

type Statistic = {
    last: number | undefined;
    min: number | undefined;
    avg: number | undefined;
    max: number | undefined;
}

function jsonToView(json: string) {
    let res = ''
    const nameObj = JSON.parse(json);

    Object.keys(nameObj).map(key => {
        if (res.length !== 0) {
            res += ', '
        }
        res += key + '=' + nameObj[key]
    })

    return res
}

function getStatistic(dataItems: DataItem[]): Statistic {
    let first = true;
    let min: number = 0;
    let max: number = 0;
    let sum: number = 0;
    let last: number = 0;
    let count = 0;

    if (dataItems.length === 0) {
        return {min: undefined, max: undefined, avg: undefined, last: undefined};
    }

    dataItems.map(value => {
        if (first) {
            min = value.value;
            max = value.value;
            sum = value.value;
            first = false;
        } else {
            if (value.value < min) {
                min = value.value;
            }
            if (value.value > max) {
                max = value.value;
            }
            sum += value.value;
        }
        last = value.value;
        count++;
    })
    return {min: min, max: max, avg: sum / count, last: last};
}

type MetricTableRowProps={
    parameterGroup: ParameterGroup;
    multiplier:number;
}

function MetricTableRow({parameterGroup,multiplier}:MetricTableRowProps): JSX.Element {
    const {last, avg, max, min}: Statistic = getStatistic(parameterGroup.dataItems);

    return (
        <>
            <Grid item xs={4} sx={bodyStyle}>{jsonToView(parameterGroup.parameters)}</Grid>
            <Grid item xs={2} sx={bodyStyle}>{last?.toFixed(3)} {multipliers[multiplier]}</Grid>
            <Grid item xs={2} sx={bodyStyle}>{min?.toFixed(3)} {multipliers[multiplier]}</Grid>
            <Grid item xs={2} sx={bodyStyle}>{avg?.toFixed(3)} {multipliers[multiplier]}</Grid>
            <Grid item xs={2} sx={bodyStyle}>{max?.toFixed(3)} {multipliers[multiplier]}</Grid>
        </>
    );
}

type MetricTableProps = {
    metric: Metric;
    multiplier: number;
}
export default function MetricTable({metric,multiplier}: MetricTableProps) {
    return (
        <Grid container p={2} sx={{backgroundColor: "white"}}>
            <Grid item xs={4} sx={headStyle}>Parameters</Grid>
            <Grid item xs={2} sx={headStyle}>Last</Grid>
            <Grid item xs={2} sx={headStyle}>Min</Grid>
            <Grid item xs={2} sx={headStyle}>Avg</Grid>
            <Grid item xs={2} sx={headStyle}>Max</Grid>
            {metric.parameterGroups.map(value =>
                <MetricTableRow key={value.id} parameterGroup={value} multiplier={multiplier} />
            )}
        </Grid>
    );
}