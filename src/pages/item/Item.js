import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Alert, Backdrop, Box, CircularProgress, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
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
    return series
}

export default function Item({setAlert, setTitle}) {
    const {itemId} = useParams()
    const [parameterGroups, setParameterGroups] = useState(undefined)
    const [begin, setBegin] = useState(3600);
    const [end, setEnd] = useState(0);

    function updParameterGroups() {
        let beginDate = new Date(new Date().getTime() - begin * 1000)
        let endDate = new Date(new Date().getTime() - end * 1000)
        API.getParameterGroups(itemId, (newParameterGroups) => {
            let promises = []
            newParameterGroups.map((parameterGroup) => {
                promises.push(API.getEventsByParameterGroupId(parameterGroup.id, beginDate, endDate).then((events) => {
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
    }, [begin,end])

    return (
        <>
            {parameterGroups !== undefined
                ? <Box sx={{pl: 2, pr: 2, pt: 2, pb: 1}}>
                    <FormControl sx={{width: "200px", mr: 2}}>
                        <InputLabel id="begin-select-label">Begin</InputLabel>
                        <Select
                            labelId="begin-select-label"
                            id="begin-select"
                            value={begin}
                            label="Begin"
                            onChange={event => setBegin(event.target.value)}
                        >
                            <MenuItem value={900}>15 min</MenuItem>
                            <MenuItem value={1800}>30 min</MenuItem>
                            <MenuItem value={3600}>1 hr</MenuItem>
                            <MenuItem value={10800}>3 hr</MenuItem>
                            <MenuItem value={21600}>6 hr</MenuItem>
                            <MenuItem value={43200}>12 hr</MenuItem>
                            <MenuItem value={86400}>1 day</MenuItem>
                            <MenuItem value={172800}>2 days</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{width: "200px"}}>
                        <InputLabel id="end-select-label">End</InputLabel>
                        <Select
                            labelId="end-select-label"
                            id="end-select"
                            value={end}
                            label="End"
                            onChange={event => setEnd(event.target.value)}
                        >
                            <MenuItem value={0}>Now</MenuItem>
                            <MenuItem value={900}>15 min</MenuItem>
                            <MenuItem value={1800}>30 min</MenuItem>
                            <MenuItem value={3600}>1 hr</MenuItem>
                            <MenuItem value={10800}>3 hr</MenuItem>
                            <MenuItem value={21600}>6 hr</MenuItem>
                            <MenuItem value={43200}>12 hr</MenuItem>
                            <MenuItem value={86400}>1 day</MenuItem>
                            <MenuItem value={172800}>2 days</MenuItem>
                        </Select>
                    </FormControl>
                    <Graphic series={parameterGroupToSeries(parameterGroups)}/>
                </Box>
                : <Backdrop open={true} sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            }
        </>
    );
}
