import React, {useEffect, useState} from "react";
import API from "../../API/API";
import {Alert, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import TriggerDetail from "./TriggerDetail";

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
function statusCell(param) {
    console.log(param)
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                pt: 2,
                backgroundColor: param.value.localeCompare("OK") === 0 ? "#ccffda" : "#ffd3cc"
            }}
        >
            {param.value}
        </Box>
    )
}

export default function Triggers({setAlert, setTitle}) {
    const [triggers, setTriggers] = useState(undefined);
    const [showDetails,setShowDetails] = useState(false)
    const [selectedTrigger,setSelectedTrigger]= useState(undefined)

    function updTriggers() {
        API.getTriggers((newTriggers) => {
            setTriggers(newTriggers)
        }, (reason) => {
            setAlert(<Alert severity={"error"}>Server error!</Alert>)
        })
    }

    function rowClick(trigger) {
        setSelectedTrigger(trigger)
        setShowDetails(true)
    }

    useEffect(() => {
        setTitle("Triggers")
        updTriggers()
    }, [])

    return (
        <>
            {triggers !== undefined
                ? <TableContainer>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Timestamp</TableCell>
                                <TableCell align="right">Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {triggers.map((value) => {
                                value.lastStatusUpdate = new Date(value.lastStatusUpdate).toLocaleString()
                                return value
                            }).map((value)=><TableRow
                                key={value.id}
                                sx={{backgroundColor:value.lastStatus.localeCompare("OK")===0?"#ccffda":"#ffd3cc",borderBottom:"2px solid darkgrey"}}
                                onClick={()=>rowClick(value)}
                            >
                                <TableCell align={"center"}>{value.lastStatus}</TableCell>
                                <TableCell align={"right"} width={170}>{value.lastStatusUpdate}</TableCell>
                                <TableCell>{value.name}</TableCell>
                            </TableRow>)
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                : <></>
            }
            {selectedTrigger!==undefined
                ?<TriggerDetail trigger={selectedTrigger} showDetail={showDetails} setShowDetail={setShowDetails} />
                :<></>
            }
        </>
    )
}