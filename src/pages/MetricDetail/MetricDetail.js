import React, {useEffect, useRef, useState} from "react";
import {useParams} from 'react-router-dom';
import APIServer from "../../API/APIServer";
import Graphic from "../../components/Graphic/Graphic";
import Table from "../../components/Table/Table";
import classes from "./MetricDetail.module.css";

function getPrecision(n) {
    for(var i = 0; n > 9000; i++) {
        n /= 1000;
    }
    return i;
}

const multipliers=["","K","M","G","T","E","P"]

function formatDate(date) {
    let month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear(),
        minutes = ''+date.getMinutes(),
        seconds = ''+date.getSeconds();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if (minutes.length < 2) 
        minutes = '0' + minutes;
    if (seconds.length < 2) 
        seconds = '0' + seconds;

    return [year, month, day].join('-')+" "+date.getHours()+":"+minutes+":"+seconds;
}

function MetricDetail(){
    let div=useRef(null)
    let { path }=useParams();
    const [begin,setBegin]=useState(-60)
    const [limits,setLimits]=useState()
    const [events,setEvents]=useState()
    const [end,setEnd]=useState(0)

    const columns=[
        {colTitle:"Name",colName:"name"},
        {colTitle:"Last",colName:"last"},
        {colTitle:"Min",colName:"min"},
        {colTitle:"Avg",colName:"avg"},
        {colTitle:"Max",colName:"max"},
    ]

    function setPeriod(beg,en){
        setLimits(undefined)
        setEvents(undefined)
        setBegin(beg)
        setEnd(en)
    }
    useEffect(()=>{
        let precision=0
        const response=APIServer.getContent('/apiv1/gui/metrics/limits?path='+path+'&beginPeriod='+begin+'&endPeriod='+end)
        response.then(value =>{
            let locLimits=[]
            let max=0
            value.data.forEach(lim =>{
                const limMax=Math.abs(lim.max)
                if(max<limMax){
                    max=limMax
                }
            })
            precision=getPrecision(max)
            value.data.forEach(lim =>{
                let name=JSON.parse(lim.name)
                let newName=""
                for (const [key, value] of Object.entries(name)) {
                    newName+=key+":"+value+" ";
                }
                lim.name=newName
                lim.min=(lim.min/Math.pow(1000,precision)).toFixed(3)+' '+multipliers[precision]
                lim.max=(lim.max/Math.pow(1000,precision)).toFixed(3)+' '+multipliers[precision]
                lim.avg=(lim.avg/Math.pow(1000,precision)).toFixed(3)+' '+multipliers[precision]
                lim.last=(lim.last/Math.pow(1000,precision)).toFixed(3)+' '+multipliers[precision]
                locLimits.push(lim)
            })
            setLimits(locLimits)
        }
        )    
        const responseEvents=APIServer.getContent('/apiv1/gui/metrics/events?path='+path+'&beginPeriod='+begin+'&endPeriod='+end)
        responseEvents.then(value =>{
            let locEvents=[]
            value.data.forEach(event =>{
                let newObj={}
                Object.keys(event).forEach(key =>{
                    if(key.localeCompare("time")===0){
                        newObj.time=formatDate(new Date(event.time))
                    }else{
                        let value=(event[key]/Math.pow(1000,precision)).toFixed(3);
                        let newKey=""
                        key=JSON.parse(key)
                        for (const [name, value] of Object.entries(key)) {
                            newKey+=name+":"+value+" ";
                        }
                        newObj[newKey]=value
                    }
                })
                locEvents.push(newObj)
            })
            setEvents(locEvents)
        }
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[end, begin])

    return (
        <div ref={div} className={classes.MetricDetail}>
            <h1>{path}</h1>
            <div className={classes.MetricDetailPeriods}>
            <button className={classes.MetricDetailButton} onClick={()=>{setPeriod(-2880,0)}}>Last 2 days</button>
            <button className={classes.MetricDetailButton} onClick={()=>{setPeriod(-1440,0)}}>Last 1 days</button>
            <button className={classes.MetricDetailButton} onClick={()=>{setPeriod(-2880,-1440)}}>Prev 1 day</button>
            <button className={classes.MetricDetailButton} onClick={()=>{setPeriod(-720,0)}}>Last 12 hours</button>
            <button className={classes.MetricDetailButton} onClick={()=>{setPeriod(-360,0)}}>Last 6 hours</button>
            <button className={classes.MetricDetailButton} onClick={()=>{setPeriod(-120,0)}}>Last 2 hours</button>
            <button className={classes.MetricDetailButton} onClick={()=>{setPeriod(-60,0)}}>Last 1 hour</button>
            <button className={classes.MetricDetailButton} onClick={()=>{setPeriod(-30,0)}}>Last 30 min</button>
            </div>
            {events===undefined
                ?<div>Loading...</div>
                :<Graphic data={events} width={div.current.offsetWidth-70}/>
            }
            {limits===undefined
                ?<div>Loading...</div>
                :<Table rows={limits} columns={columns}/>
            }
        </div>
    );
}

export default MetricDetail
