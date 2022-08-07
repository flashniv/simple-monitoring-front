import React from "react";
import {Box, Button, Modal, Stack, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 950,
    // height: 400,
    backgroundColor: '#fff',
    border: '2px solid #000',
    boxShadow: 24,
    padding: '20px',
    maxHeight: '600px',
    overflowY: "scroll"
};

export default function TriggerDetail({trigger, showDetail, setShowDetail}) {
    console.log(trigger)
    return (
        <Modal open={showDetail} onClose={() => setShowDetail(false)}>
            <Stack spacing={2} style={style}>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Status</TableCell>
                                <TableCell>
                                    <Box sx={{display: "flex", justifyContent: "space-between", backgroundColor:trigger.lastStatus.localeCompare("OK") === 0 ? "#ccffda" : "#ffd3cc"}}>
                                        <Box pt={1} pl={2}>{trigger.lastStatus}</Box>
                                        <Button variant={"contained"}>history</Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Timestamp</TableCell><TableCell>{trigger.lastStatusUpdate}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Name</TableCell><TableCell>{trigger.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell><TableCell>{trigger.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Trigger ID</TableCell><TableCell>{trigger.triggerId}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Conf</TableCell><TableCell>{trigger.conf}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Enabled</TableCell><TableCell>{'' + trigger.enabled}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Modal>
    )
}