import React, {useState} from 'react';
import useAlertersQuery, {
    AlerterQueryResponse, AlertersQueryResponse,
    IAlerter,
    useAddAlerterMutation
} from "../../../api/graphql/useAlertersQuery";
import {Box, Button, Grid, Modal, Skeleton, TextField, Typography} from "@mui/material";
import {Alerter} from "../../../types/Alerter";
import {TriggerPriority} from "../../../types/Trigger";
import {ApolloQueryResult, OperationVariables} from "@apollo/client";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
};

type AlerterProps = {
    alerter: Alerter;
}

function AlerterItem({alerter}: AlerterProps) {
    if (alerter.className.includes("alerters.TelegramAlertSender")) {
        const properties: {
            token: string;
            chat_id: number;
        } = JSON.parse(alerter.properties);
        return (
            <Box borderBottom={"1px solid lightgray"} p={1} pl={2} display={"flex"}>
                <Box mr={2}>TG</Box>
                <Box mr={2}>{alerter.minPriority}</Box>
                <Box mr={2}>{alerter.description}</Box>
                <Box mr={2}>Token: {properties.token}</Box>
                <Box>Chat: {properties.chat_id}</Box>
            </Box>
        );
    }
    return (
        <Box>
            {alerter.className}
        </Box>
    );
}

type AddTGDialogProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    orgId: string;
    refreshAlerters: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<AlertersQueryResponse>>
}

function AddTGDialog({open, setOpen, orgId, refreshAlerters}: AddTGDialogProps) {
    const [desc, setDesc] = useState("");
    const [token, setToken] = useState("");
    const [chatId, setChatId] = useState("");
    const [addAlerter] = useAddAlerterMutation();

    function closeWin() {
        setToken("");
        setChatId("");
        setDesc("");
        setOpen(false);
    }

    function saveTGAlerter() {
        const props = "{\"token\":\"" + token + "\",\"chat_id\":\"" + chatId + "\"}";
        const tgAlerter: IAlerter = {
            organizationId: orgId,
            className: "ua.com.serverhelp.simplemonitoring.service.alert.alerters.TelegramAlertSender",
            properties: props,
            description: desc,
            minPriority: "INFO"
        }
        addAlerter({
            variables: {
                inputAlerter: tgAlerter
            }
        })
            .then(value =>
                refreshAlerters({
                    orgId: orgId
                })
            )
            .catch(reason => {
                console.error(reason)
            });
        closeWin();
    }

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" align={"center"} mb={2}>
                    Add Telegram alerter
                </Typography>
                <TextField
                    fullWidth
                    value={desc}
                    onChange={event => setDesc(event.target.value)}
                    label={"Description"}
                    sx={{mb: 2}}
                />
                <TextField
                    fullWidth
                    value={token}
                    onChange={event => setToken(event.target.value)}
                    label={"Token"}
                    sx={{mb: 2}}
                />
                <TextField
                    fullWidth
                    value={chatId}
                    onChange={event => setChatId(event.target.value)}
                    label={"Chat ID"}
                />
                <Box display={"flex"} justifyContent={"right"} pt={2}>
                    <Button onClick={saveTGAlerter}>Ok</Button>
                    <Button onClick={closeWin}>Cancel</Button>
                </Box>
            </Box>
        </Modal>
    );
}

type AlertersProps = {
    orgId: string
}

export default function Alerters({orgId}: AlertersProps) {
    const {data, loading, error, refetch} = useAlertersQuery(orgId);
    const [showAddTGDialog, setShowTGDialog] = useState(false);
    const [showAddSlackDialog, setShowSlackDialog] = useState(false);

    if (loading) {
        return (
            <Skeleton variant="rectangular" width={1000} height={500}/>
        );
    }
    if (error) {
        return (
            <Box sx={{
                backgroundColor: "white",
                minHeight: 900,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                Error
            </Box>
        );
    }
    return (
        <>
            <Grid item xs={9} p={1}>
                <Box border={"1px solid gray"} p={1} minHeight={600}>
                    <Typography variant={"h6"} textAlign={"center"} p={2}>
                        Alerters
                    </Typography>
                    <Button variant={"outlined"} sx={{mr: 2}} onClick={() => {
                        setShowSlackDialog(false);
                        setShowTGDialog(true);
                    }}>Add TG</Button>
                    <Button variant={"outlined"} onClick={() => {
                        setShowTGDialog(false);
                        setShowSlackDialog(true);
                    }}>Add Slack</Button>
                    {data?.alerters !== undefined
                        ? data.alerters.map(value => <AlerterItem key={value.id} alerter={value}/>)
                        : <>Error</>
                    }
                </Box>
            </Grid>
            <AddTGDialog open={showAddTGDialog} setOpen={setShowTGDialog} orgId={orgId} refreshAlerters={refetch}/>
        </>
    );
}