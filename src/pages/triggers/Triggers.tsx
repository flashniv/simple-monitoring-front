import React, {useState} from 'react';
import useTriggersQuery from "../../api/graphql/useTriggersQuery";
import {Box, Checkbox, Grid, IconButton, Skeleton, TextField} from "@mui/material";
import {Trigger} from "../../types/Trigger";
import TriggerItem from "./TriggerItem";
import SyncIcon from "@mui/icons-material/Sync";

type AlertsProps = {
    orgId: string;
    setAlert: React.Dispatch<React.SetStateAction<any>>;
}

export default function Triggers({orgId, setAlert}: AlertsProps) {
    const {data, error, loading, refetch} = useTriggersQuery(orgId);
    const [filter, setFilter] = useState("");
    const [onlyAlerted, setOnlyAlerted] = useState(false);

    function filterFunc(trigger: Trigger) {
        if (trigger.lastStatus.toLocaleString().localeCompare("OK") === 0 && onlyAlerted) return false;
        if (!trigger.name.includes(filter)) return false;
        return true;
    }

    function dateSort(a: Trigger, b: Trigger) {
        const aTime = new Date(a.lastStatusUpdate);
        const bTime = new Date(b.lastStatusUpdate);
        return bTime.getTime() - aTime.getTime();
    }

    if (error) {
        setAlert(error);
        return (
            <Box pl={2} pr={2} pb={2} pt={3}>
                <>Error</>
            </Box>
        )
    }
    if (loading) {
        return (
            <Box pl={2} pr={2} pb={2} pt={3}>
                <Skeleton variant="rectangular" height={"100vh"}/>
            </Box>
        )
    }

    return (
        <Box p={2}>
            <Grid container columns={{xs: 3, sm: 6, md: 12, lg: 12}} mb={2}>
                <Grid item xs={6}>
                    <TextField
                        variant={"standard"}
                        label={"Search"}
                        value={filter}
                        onChange={event => setFilter(event.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6} sx={{display: "flex", alignItems: "center"}} display={"flex"} justifyContent={"space-between"}>
                    <Box>
                        Only alerted
                        <Checkbox
                            value={onlyAlerted}
                            onChange={event => setOnlyAlerted(event.target.checked)}
                        />
                    </Box>
                    <IconButton onClick={()=>refetch({orgId: orgId,page: 0,size: 8000})}>
                        <SyncIcon />
                    </IconButton>
                </Grid>
            </Grid>
            {data?.triggersByOrganization !== undefined
                ? <>{data?.triggersByOrganization.filter(filterFunc).sort(dateSort).map(value =>
                    <TriggerItem key={value.id} triggerRO={value}/>
                )}</>
                : <>Error</>
            }
        </Box>
    );
}