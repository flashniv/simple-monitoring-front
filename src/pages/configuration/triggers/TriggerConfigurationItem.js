import React from "react";
import {Box, Checkbox, Grid} from "@mui/material";

const rowStyle = {
    borderBottom: "1px solid lightgrey"
}

export default function TriggerConfigurationItem({trigger, selectedTriggers, setSelectedTriggers}) {
    const checked = selectedTriggers.includes(trigger.id)
    const setChecked = function (event) {
        if (event.target.checked) {
            setSelectedTriggers([...selectedTriggers, trigger.id])
        } else {
            setSelectedTriggers(selectedTriggers.filter(id => id !== trigger.id))
        }
    }

    return (
        <React.Fragment>
            <Grid sx={rowStyle} xs={1} item>
                <Checkbox
                    checked={checked}
                    onChange={setChecked}
                    inputProps={{'aria-label': 'controlled'}}
                />
            </Grid>
            <Grid sx={rowStyle} xs={1} item>
                {trigger.lastStatus}
            </Grid>
            <Grid sx={rowStyle} xs={1} item>
                {trigger.suppressed ? "Suppressed" : ""}
            </Grid>
            <Grid sx={rowStyle} xs={1} item>
                {!trigger.enabled ? "Disabled" : ""}
            </Grid>
            <Grid sx={rowStyle} xs={8} item>
                <Box
                    sx={{fontWeight:"bold"}}
                >
                    {trigger.name}
                </Box>
                <Box
                    sx={{color:"gray"}}
                >
                    {trigger.triggerId}
                </Box>
            </Grid>
        </React.Fragment>

    )
}