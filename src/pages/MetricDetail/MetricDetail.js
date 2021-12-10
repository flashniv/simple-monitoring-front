import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import APIServer from "../../API/APIServer";
import Graphic from "../../components/Graphic/Graphic";
import Table from "../../components/Table/Table";
import classes from "./MetricDetail.module.css";

function formatDate(date) {
    var month = '' + (date.getMonth() + 1),
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
        const response=APIServer.getContent('/apiv1/gui/metrics/limits?path='+path+'&beginPeriod='+begin+'&endPeriod='+end)
        response.then(value =>{
            let locLimits=[]
            value.data.map(lim =>{
                let name=JSON.parse(lim.name)
                let newName=""
                for (const [key, value] of Object.entries(name)) {
                    newName+=key+":"+value+" ";
                }
                lim.name=newName
                lim.min=lim.min.toFixed(3)
                lim.max=lim.max.toFixed(3)
                lim.last=lim.last.toFixed(3)
                lim.avg=lim.avg.toFixed(3)
                locLimits.push(lim)
            })
            setLimits(locLimits)
        }
        )    
        const responseEvents=APIServer.getContent('/apiv1/gui/metrics/events?path='+path+'&beginPeriod='+begin+'&endPeriod='+end)
        responseEvents.then(value =>{
            let locEvents=[]
            value.data.map(event =>{
                var newObj={}
                Object.keys(event).map(key =>{
                    if(key.localeCompare("time")==0){
                        newObj.time=formatDate(new Date(event.time))
                    }else{
                        let value=event[key].toFixed(3);
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
    },[end,begin])

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
            {events==undefined
                ?<div>Loading...</div>
                :<Graphic data={events} width={div.current.offsetWidth-70}/>
            }
            {limits==undefined
                ?<div>Loading...</div>
                :<Table rows={limits} columns={columns}/>
            }
        </div>
    );
}

export default MetricDetail
