import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Alert, Backdrop, Box, CircularProgress, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import API from "../../API/API";
import Graphic from "./Graphic";
import Scopes from "./Scopes";

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

function getMultiplier(parameterGroups) {
    let absMaximum = Number.MIN_SAFE_INTEGER;
    let mult = 0
    parameterGroups.map((parameterGroup) => {
        parameterGroup.items.map((item) => {
            if (item.value > absMaximum) absMaximum = item.value
        })
    })

    while (absMaximum > 7000) {
        absMaximum /= 1000
        mult++
    }

    return mult
}

function jsonToView(json) {
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

function parameterGroupToSeries(parameterGroups) {
    let series = []
    const multiplier = getMultiplier(parameterGroups)

    parameterGroups.map((parameterGroup) => {
        let data = []
        let scopes = undefined
        let avgSum = 0

        parameterGroup.items.map((item) => {
            item.value = +((item.value / Math.pow(1000, multiplier)).toFixed(3))
            data.push([item.timestamp * 1000, item.value])
            if (scopes === undefined) {
                scopes = {
                    min: item.value,
                    max: item.value,
                    last: item.value
                }
            } else {
                if (item.value > scopes.max) scopes.max = item.value
                if (item.value < scopes.min) scopes.min = item.value
                scopes.last = item.value
            }
            avgSum += item.value
        })
        if(scopes !==undefined) scopes.avg = (parameterGroup.items !== undefined ? avgSum / parameterGroup.items.length : 0)
        series.push({
            "name": jsonToView(parameterGroup.json),
            "data": data,
            "scopes": scopes,
            "multiplier": multiplier
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
                setParameterGroups(parameterGroupToSeries(newParameterGroups))
            })
        }, (reason) => {
            setAlert(<Alert severity={"error"}>Server error!</Alert>)
        })
    }

    useEffect(() => {
        setTitle("Metric " + itemId)
        updParameterGroups()
    }, [begin, end])

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
                            <Graphic series={parameterGroups}/>
                            <Scopes parameters={parameterGroups}/>
                </Box>
                : <Backdrop open={true} sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            }
        </>
    );
}
