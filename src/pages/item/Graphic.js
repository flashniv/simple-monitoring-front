import React from "react";
import Chart from 'react-apexcharts'

const options = {
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
        type: 'datetime'
    }
};

export default function Graphic({series}) {
    return (
        <Chart
            options={options}
            series={series}
            type={"line"}
            width={"100%"}
            height={500}
        />
    )
}
