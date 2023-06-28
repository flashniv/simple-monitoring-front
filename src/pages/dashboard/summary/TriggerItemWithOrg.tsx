import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Checkbox,
    Grid,
    Modal,
    TextField,
    Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Trigger, TriggerStatus} from "../../../types/Trigger";
import {ITrigger, useTriggerMutation} from "../../../api/graphql/useTriggersQuery";
import Alerts from "../../triggers/Alerts";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: 400, sm: 800, lg: 1200},
    maxHeight: "100vh",
    overflowY: "auto",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pr: 2,
    pb: 2
};

function getTimeAgo(inputDate: string) {
    const startDate = new Date(inputDate)
    const minutesAgo = (Date.now() - startDate.getTime()) / 60000
    if (minutesAgo < 3) {
        return "just now"
    } else if (minutesAgo < 7) {
        return "a few minutes"
    } else if (minutesAgo < 10) {
        return "less 10 minutes"
    } else if (minutesAgo < 30) {
        return "less 30 minutes"
    } else if (minutesAgo < 60) {
        return "less an hour"
    } else if (minutesAgo < 120) {
        return "less an 2 hours"
    } else if (minutesAgo < 360) {
        return "less an 6 hours"
    } else if (minutesAgo < 720) {
        return "less an 12 hours"
    } else if (minutesAgo < 1440) {
        return "today"
    } else if (minutesAgo < 2880) {
        return "yesterday"
    } else if (minutesAgo < 10080) {
        return "current week"
    } else if (minutesAgo < 43200) {
        return "current mounth"
    }
    return "too old"
}

const okTrigger = {
    display: "flex",
    alignItems: "center",
    border: "1px solid gray",
    mb: {xs: 1, md: 0},
    backgroundColor: "lightgreen"
}
const errTrigger = {
    display: "flex",
    alignItems: "center",
    border: "1px solid gray",
    mb: {xs: 1, md: 0},
    backgroundColor: "lightpink"
}
const failedTrigger = {
    display: "flex",
    alignItems: "center",
    border: "1px solid gray",
    mb: {xs: 1, md: 0},
    backgroundColor: "red"
}
const uncheckedTrigger = {
    display: "flex",
    alignItems: "center",
    border: "1px solid gray",
    mb: {xs: 1, md: 0},
    backgroundColor: "gray"
}

function getStyle(status: TriggerStatus) {
    if (status.toLocaleString().localeCompare("OK") === 0) {
        return okTrigger;
    } else if (status.toLocaleString().localeCompare("ERROR") === 0) {
        return errTrigger;
    } else if (status.toLocaleString().localeCompare("FAILED") === 0) {
        return failedTrigger;
    }
    return uncheckedTrigger;
}

type TriggerDetailsProps = {
    triggerRO: Trigger;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function TriggerDetails({triggerRO, open, setOpen}: TriggerDetailsProps) {
    const [modified, setModified] = React.useState(false);
    const [trigger, setTrigger] = React.useState<Trigger>(triggerRO);
    const [updateTrigger, {data, loading, error}] = useTriggerMutation();

    function saveTrigger() {
        const inputTrigger: ITrigger = {
            triggerId: trigger.triggerId,
            enabled: trigger.enabled,
            muted: trigger.muted,
            description: trigger.description,
            name: trigger.name,
            conf: trigger.conf,
            suppressedScore: trigger.suppressedScore,
            organizationId: trigger.organization.id,
            priority: trigger.priority
        }
        updateTrigger({
            variables: {
                triggerId: trigger.id,
                inputTrigger: inputTrigger
            }
        });
        setModified(false);
        setOpen(false);
    }

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Grid container columns={{xs: 3, sm: 6, md: 12, lg: 12}} spacing={2} sx={style}>
                <Grid item xs={12}>
                    <TextField
                        label={"Name"}
                        fullWidth
                        value={trigger.name}
                        onChange={event => {
                            setModified(true);
                            setTrigger({...trigger, name: event.target.value});
                        }}
                    />
                </Grid>
                <Grid item xs={3} display={"flex"} alignItems={"center"}>
                    Current status: {trigger.lastStatus}
                </Grid>
                <Grid item xs={3} display={"flex"} alignItems={"center"}>
                    Last change: {new Date(trigger.lastStatusUpdate).toLocaleString()}
                </Grid>
                <Grid item xs={3}>
                    Enabled
                    <Checkbox
                        checked={trigger.enabled}
                        onChange={event => {
                            setModified(true);
                            setTrigger({...trigger, enabled: event.target.checked});
                        }}
                    />
                    Muted
                    <Checkbox
                        checked={trigger.muted}
                        onChange={event => {
                            setModified(true);
                            setTrigger({...trigger, muted: event.target.checked});
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label={"Conf"}
                        fullWidth
                        multiline
                        maxRows={10}
                        value={trigger.conf}
                        onChange={event => {
                            setModified(true);
                            setTrigger({...trigger, conf: event.target.value});
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Alerts</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Alerts alerts={trigger.alerts}/>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12} display={"flex"} justifyContent={"right"}>
                    <Button variant={"outlined"} sx={{mr: 2}} disabled={!modified} onClick={saveTrigger}>Save</Button>
                    <Button variant={"outlined"} onClick={() => setOpen(false)}>cancel</Button>
                </Grid>
            </Grid>
        </Modal>
    );
}

type TriggerProps = {
    triggerRO: Trigger;
}
export default function TriggerItemWithOrg({triggerRO}: TriggerProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Grid
                container
                columns={{xs: 1, sm: 1, md: 12, lg: 12}}
                p={1}
                sx={getStyle(triggerRO.lastStatus)}
            >
                <Grid item xs={2} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Box>{getTimeAgo(triggerRO.lastStatusUpdate)}</Box>
                    <Box sx={{pr: {xs: 0, md: 2}}}>
                        {triggerRO.lastStatus}
                    </Box>
                </Grid>
                <Grid item xs={1}>
                    {triggerRO.organization.name}
                </Grid>
                <Grid item xs={8} sx={{wordBreak: "break-word"}}>
                    {triggerRO.name}
                </Grid>
                <Grid item xs={1} display={"flex"} justifyContent={"right"}>
                    <Button size="small" onClick={() => setOpen(true)}>Details</Button>
                </Grid>
            </Grid>
            <TriggerDetails triggerRO={triggerRO} open={open} setOpen={setOpen}/>
        </>
    );
}