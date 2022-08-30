import React from "react";
import Chart from 'react-apexcharts'

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getSeries() {
    let res=[]
    let date=1661677293
    for (let i = 0; i < 150; i++) {
        res.push([(date-(i*1000))*1000,getRandomInt(1000)])
    }
    return res
}

const options = {
    chart: {
        height: 380,
        width: "100%",
        type: "area",
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

const series= [
    {
        name: "Series 1",
        data: getSeries()
    },
    {
        name: "Series 2",
        data: getSeries()
    }
]

export default function Item2() {
    return (
        <Chart options={options} series={series} type="area" width={900} height={320}/>
    )
}
