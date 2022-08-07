import React, {useEffect, useState} from "react";
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import API from "../../API/API";
import {Alert, Box} from "@mui/material";

/*{"id":"731efbe48892c8eb486bccb36b9a8b66",
"triggerId":"db.myproject.jenkins.certificates.vovaNew.new{}.daily",
"name":"Data not receive 24h on db.myproject.jenkins.certificates.vovaNew.new",
"description":"Check last value timestamp for 24h age",
"lastStatus":"OK",
"priority":"HIGH",
"lastStatusUpdate":"2022-08-05T03:05:17.669155Z",
"enabled":true,
"conf":""}
*/
function row(param) {
    console.log(param)
    return(
        <Box
            sx={{
                width:"100%",
                height:"100%",
                textAlign:"center",
                pt:2,
                backgroundColor:param.value.localeCompare("OK")===0?"#ccffda":"#ffd3cc"
            }}
        >
            {param.value}
        </Box>
    )
}

const columns = [
    {field: 'lastStatus', headerName: 'Status', flex: 0.4,
        renderCell:row
    },
    {field: 'lastStatusUpdate', headerName: 'Upd time', flex: 1},
    {field: 'name', headerName: 'Name',flex: 4},
];

export default function Triggers({setAlert,setTitle}) {
    const [triggers,setTriggers] = useState(undefined);

    function updTriggers() {
        API.getTriggers((newTriggers)=>{
            setTriggers(newTriggers)
        },(reason)=>{
            setAlert(<Alert severity={"error"}>Server error!</Alert>)
        })
    }

    useEffect(()=>{
        setTitle("Triggers")
        updTriggers()
    },[])

    return(
        <>
            {triggers !== undefined
                ? <DataGrid
                    sx={{
                        height: "91vh"
                    }}
                    rows={triggers.map((value)=>{
                        value.lastStatusUpdate=new Date(value.lastStatusUpdate).toLocaleString()
                        return value
                    })}
                    columns={columns}
                    components={{
                        Toolbar: GridToolbar
                    }}
                />
                : <></>
            }

        </>
    )
}