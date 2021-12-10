import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import APIServer from "../../API/APIServer";
import Table from "../../components/Table/Table";
import classes from "./MetricDetail.module.css";

function MetricDetail(){
    let { path }=useParams();
    const [begin,setBegin]=useState(-60)
    const [limits,setLimits]=useState()
    const [end,setEnd]=useState(0)
    const [img,setImg]=useState()

    const columns=[
        {colTitle:"Name",colName:"name"},
        {colTitle:"Last",colName:"last"},
        {colTitle:"Min",colName:"min"},
        {colTitle:"Avg",colName:"avg"},
        {colTitle:"Max",colName:"max"},
    ]

    function setPeriod(beg,en){
        setLimits(undefined)
        setImg(undefined)
        setBegin(beg)
        setEnd(en)
    }
    useEffect(()=>{
        const response=APIServer.getImg('/apiv1/gui/metrics/chart/1200/350/0?path='+path+'&beginPeriod='+begin+'&endPeriod='+end)
        response.then(value =>
            setImg(Buffer.from(value.data).toString('base64'))
        )    
    },[end,begin])
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
                locLimits.push(lim)
            })
            setLimits(locLimits)
        }
        )    
    },[end,begin])
    
    return (
        <div className={classes.MetricDetail}>
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
            {img==undefined
                ?<div>Loading...</div>
                :<img src={"data:image/png;base64,"+img} alt="graphic"/>
            }
            {limits==undefined
                ?<div>Loading...</div>
                :<Table rows={limits} columns={columns}/>
            }
        </div>
    );
}

export default MetricDetail
