import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import APIServer from "../../API/APIServer"
import classes from "./DashboardAlertPanel.module.css";

function onError(reason){
    console.error(reason)
}
function DashboardAlertPanel(){
    var addRow=function(row){
        console.log(row)
        setRows([...rows,row])
    }
    var updateRows=function(){
        console.log("update dashboard alerts")
        const response=APIServer.getContent('/apiv1/gui/dashboard/currentProblems')
        response.then((value)=>{
            value.data.map(jsonAlert =>
                addRow(jsonAlert)
            )
        },onError)
    }
        // {
    //     "operationData": "",
    //     "triggerName": "Swap usage",
    //     "triggerDescription": "Swap usage more than 50%",
    //     "host": "exporter.myproj.zabx52.node.memory.swap",
    //     "id": 27384573,
    //     "startDate": "2021-12-03T13:23:39.843774Z"
    // }
    const columns=[
        {colTitle:"Start date",colName:"startDate"},
        {colTitle:"Host",colName:"host"},
        {colTitle:"Trigger name",colName:"triggerName"}
    ]
    const [rows,setRows]=useState([])
    useEffect(
        () =>{
            updateRows()
            let id = setInterval(() => {
                updateRows()
            }, 60000);
            return () => clearInterval(id);
        },
        []
    )

    return (
        <div className={classes.DashboardAlertPanel}>
            <h2 className={classes.header}>Current problems</h2>
            <Table columns={columns} rows={rows}/>
        </div>
    );
}

export default DashboardAlertPanel;
