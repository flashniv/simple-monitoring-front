import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Alert, Backdrop, CircularProgress} from "@mui/material";
import API from "../../API/API";
import Graphic from "./Graphic";

/*
[{
"id":130,
"metric":{"path":"collectd.collaborator.valorans.interface"},
"json":"{\"ds_name\":\"rx\",\"instance\":\"veth4315bb5\",\"ds_type\":\"derive\",\"type\":\"if_octets\"}",
"parameters":{"ds_name":"rx","instance":"veth4315bb5","ds_type":"derive","type":"if_octets"}
},
{
"id":131,
"metric":{"path":"collectd.collaborator.valorans.interface"},
"json":"{\"ds_name\":\"tx\",\"instance\":\"veth4315bb5\",\"ds_type\":\"derive\",\"type\":\"if_octets\"}",
"parameters":{"ds_name":"tx","instance":"veth4315bb5","ds_type":"derive","type":"if_octets"}
}]
*/

function parameterGroupToSeries(parameterGroups) {
    let series = []
    parameterGroups.map((parameterGroup) => {
        let data = []
        parameterGroup.items.map((item) => {
            data.push([item.timestamp * 1000, item.value])
        })
        series.push({
            "name": parameterGroup.json,
            "data": data
        })
    })
    console.log(series)
    return series
}

export default function Item({setAlert, setTitle}) {
    const {itemId} = useParams()
    const [parameterGroups, setParameterGroups] = useState(undefined)

    function updParameterGroups() {
        let begin = new Date(new Date().getTime() - 7200000)
        let end = new Date()
        API.getParameterGroups(itemId, (newParameterGroups) => {
            let promises = []
            newParameterGroups.map((parameterGroup) => {
                promises.push(API.getEventsByParameterGroupId(parameterGroup.id, begin, end).then((events) => {
                    parameterGroup.items = events.data
                }))
            })
            Promise.all(promises).then(() => {
                setParameterGroups(newParameterGroups)
            })
        }, (reason) => {
            setAlert(<Alert severity={"error"}>Server error!</Alert>)
        })
    }

    useEffect(() => {
        setTitle("Metric " + itemId)
        updParameterGroups()
    }, [])

    return (
        <>
            {parameterGroups !== undefined
                ? <Graphic series={parameterGroupToSeries(parameterGroups)}/>
                : <Backdrop open={true} sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            }
        </>
    );
}
