import React, {useEffect, useState} from "react";
import API from "../../../../API/API";
import {Alert, Backdrop, CircularProgress, Grid, Typography} from "@mui/material";

const itemStyle = {
    border: "1px solid lightgray",
    p:1
};

function filterAlerts(alert) {
    const dateLong = new Date(alert.alertTimestamp).getTime() / 1000
    return (new Date().getTime() / 1000 - dateLong) < 604800
}

function sortTriggers(trigger1, trigger2) {
    if (trigger1.alerts.length > trigger2.alerts.length) return -1
    if (trigger1.alerts.length < trigger2.alerts.length) return 1
    return 0
}

export default function TriggersReport({setAlert, setTitle}) {
    const [triggers, setTriggers] = useState()

    function updTriggers() {
        API.getTriggers((newTriggers) => {
            let promises = []
            newTriggers.map((newTrigger) => {
                promises.push(API.getTriggerDetailAsync(newTrigger.id).then((alerts) => {
                    newTrigger.alerts = alerts.data.alerts.filter(filterAlerts)
                }))
            })
            Promise.all(promises).then(() => {
                setTriggers(newTriggers)
            })
        }, (reason) => {
            setAlert(<Alert severity={"error"}>Server error!</Alert>)
        })
    }

    useEffect(() => {
        setTitle("Triggers report")
        updTriggers()
    }, [])


    return (
        <>
            {triggers !== undefined
                ? <>
                    <Typography variant="h5" textAlign="center" pt={2}>Frequency alerts by triggers</Typography>
                    <Grid columns={{xs:20}} container>
                        {triggers.filter(trigger=>{return trigger.alerts.length!==0}).sort(sortTriggers).map(trigger =>
                            <React.Fragment key={trigger.id}>
                                <Grid sx={itemStyle} xs={1} item>
                                    {trigger.alerts.length}
                                </Grid>
                                <Grid sx={itemStyle} xs={1} item>
                                    {(trigger.suppressed?trigger.lastStatus:"Suppressed")}
                                </Grid>
                                <Grid sx={itemStyle} xs={18} item>
                                    {trigger.name}
                                </Grid>
                            </React.Fragment>
                        )}
                    </Grid>
                </>
                : <Backdrop open={true} sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            }
        </>
    )
}