import React from 'react';
import {Metric} from "../../../../types/Metric";
import ReactApexChart from 'react-apexcharts';
import {ApexOptions} from "apexcharts";
import {Box} from "@mui/material";

const options: ApexOptions = {
    chart: {
        animations: {
            enabled: false
        }
    },
    tooltip: {
        x: {
            format: 'dd MMM HH:mm:ss',
        },
    },
    stroke: {
        show: true,
        curve: 'straight',
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0,
    },
    dataLabels: {
        enabled: false,
    },
    xaxis: {
        type: "datetime"
    }
};

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

function formatDate(input: string) {
    const date = new Date(input);
    let month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear(),
        minutes = '' + date.getMinutes(),
        seconds = '' + date.getSeconds();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    if (minutes.length < 2)
        minutes = '0' + minutes;
    if (seconds.length < 2)
        seconds = '0' + seconds;

    return [year, month, day].join('-') + " " + date.getHours() + ":" + minutes + ":" + seconds;
}

function metricToSeries(metric: Metric): ApexAxisChartSeries {
    let series: ApexAxisChartSeries = [];
    metric.parameterGroups.map(value => {
        let dataLine: {
            name: string;
            data: { x: any; y: any }[];
        } = {
            name: jsonToView(value.parameters),
            data: []
        };
        value.dataItems.map(dataItem => {
            dataLine.data.push({x: formatDate(dataItem.timestamp), y: dataItem.value});
        });
        series.push(dataLine);
    });
    console.log(series);
    return series;
}

type MetricGraphProps = {
    metric: Metric;
}
export default function MetricGraph({metric}: MetricGraphProps) {
    return (
        <Box
            sx={{backgroundColor: "white", mb: 2}}
        >
            <ReactApexChart
                options={options}
                series={metricToSeries(metric)}
                type={"line"}
                width={"100%"}
                height={500}
            />
        </Box>
    )
}