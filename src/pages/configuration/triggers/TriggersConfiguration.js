import React, {useEffect, useState} from "react";
import {Alert, Backdrop, Box, Button, CircularProgress, Grid, IconButton, TextField} from "@mui/material";
import API from "../../../API/API";
import TriggerConfigurationItem from "./TriggerConfigurationItem";
import SortIcon from '@mui/icons-material/Sort';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const headerStyle = {
    p: 1,
    fontWeight: "bold",
    border: "1px solid lightgrey",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
}

export default function TriggersConfiguration({setAlert, setTitle}) {
    const [triggers, setTriggers] = useState()
    const [sortField, setSortField] = useState(0)
    const [triggerFilter, setTriggerFilter] = useState("")
    const [selectedTriggers, setSelectedTriggers] = useState([])

    function updTriggers() {
        API.getTriggers((newTriggers) => {
            setTriggers(newTriggers)
        }, (reason) => {
            setAlert(<Alert severity={"error"}>Server error!</Alert>)
        })
    }

    useEffect(() => {
        setTitle("Triggers configuration")
        updTriggers()
    }, [])

    const sortFunc = function (a1, a2) {
        switch (sortField) {
            case 1:
                return a1.lastStatus.localeCompare(a2.lastStatus)
            case 2:
                return ("" + a1.suppressed).localeCompare("" + a2.suppressed)
            case 3:
                return ("" + a1.enabled).localeCompare("" + a2.enabled)
            case 4:
                return a1.triggerId.localeCompare(a2.triggerId)
            default:
                return 0
        }
    }

    const filterFunc = function (trigger) {
        if (triggerFilter.length === 0) return true
        return trigger.triggerId.includes(triggerFilter)
    }

    const selectAll = function () {
        let newSelect = []
        triggers.filter(filterFunc).map(trigger => {
            newSelect.push(trigger.id)
        })
        setSelectedTriggers(newSelect)
    }

    const enableAll=function (enable) {
        if(window.confirm("Are you sure?")) {
            API.enableAllTriggers(selectedTriggers,enable,()=>{
                updTriggers()
            },(reason)=>{
                setAlert(<Alert severity={"error"}>Server error!</Alert>)
            })
        }
    }

    const suppressAll=function (suppress) {
        if(window.confirm("Are you sure?")) {
            API.suppressAllTriggers(selectedTriggers,suppress,()=>{
                updTriggers()
            },(reason)=>{
                setAlert(<Alert severity={"error"}>Server error!</Alert>)
            })
        }
    }

    const deleteAll=function () {
        if(window.confirm("Are you sure?")) {
            API.deleteAllTriggers(selectedTriggers,()=>{
                setSelectedTriggers([])
                updTriggers()
            },(reason)=>{
                setAlert(<Alert severity={"error"}>Server error!</Alert>)
            })
        }
    }

    return (
        <>
            {triggers !== undefined
                ? <Grid container>
                    <Grid
                        sx={{
                            p: 1,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems:"center"
                        }}
                        xs={12}
                        item
                    >
                        <span>Selected: {selectedTriggers.length}</span>
                        <Box>
                            <Button
                                sx={{mr:1}}
                                variant={"outlined"}
                                onClick={deleteAll}
                            >
                                Delete all
                            </Button>
                            <Button
                                sx={{mr:1}}
                                variant={"outlined"}
                                onClick={()=>enableAll(true)}
                            >
                                Enable all
                            </Button>
                            <Button
                                sx={{mr:1}}
                                variant={"outlined"}
                                onClick={()=>enableAll(false)}
                            >
                                Disable all
                            </Button>
                            <Button
                                sx={{mr:1}}
                                variant={"outlined"}
                                onClick={()=>suppressAll(true)}
                            >
                                Suppress all
                            </Button>
                            <Button
                                variant={"outlined"}
                                onClick={()=>suppressAll(false)}
                            >
                                Unsuppress all
                            </Button>
                        </Box>
                    </Grid>
                    <Grid sx={headerStyle} xs={1} item>
                        {selectedTriggers.length !== 0
                            ? <IconButton onClick={() => setSelectedTriggers([])}>
                                <CheckBoxOutlineBlankIcon/>
                            </IconButton>
                            : <IconButton onClick={selectAll}>
                                <DoneAllIcon/>
                            </IconButton>
                        }
                    </Grid>
                    <Grid sx={headerStyle} xs={1} item>
                        Status
                        <IconButton onClick={() => setSortField(1)}>
                            <SortIcon/>
                        </IconButton>
                    </Grid>
                    <Grid sx={headerStyle} xs={1} item>
                        Suppressed
                        <IconButton onClick={() => setSortField(2)}>
                            <SortIcon/>
                        </IconButton>
                    </Grid>
                    <Grid sx={headerStyle} xs={1} item>
                        Enabled
                        <IconButton onClick={() => setSortField(3)}>
                            <SortIcon/>
                        </IconButton>
                    </Grid>
                    <Grid sx={headerStyle} xs={8} item>
                        <Box>
                            Trigger
                            <IconButton onClick={() => setSortField(4)}>
                                <SortIcon/>
                            </IconButton>
                        </Box>
                        <TextField
                            id={"triggerFilter"}
                            label={"Filter"}
                            value={triggerFilter}
                            onChange={(e) => {
                                setTriggerFilter(e.target.value);
                                setSelectedTriggers([])
                            }}
                            variant={"standard"}
                            sx={{width: "300px"}}
                        />
                    </Grid>
                    {triggers.sort(sortFunc).filter(filterFunc).map(trigger =>
                        <TriggerConfigurationItem key={trigger.id} trigger={trigger} selectedTriggers={selectedTriggers}
                                                  setSelectedTriggers={setSelectedTriggers}/>
                    )}
                </Grid>
                : <Backdrop open={true} sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            }
        </>
    )
}