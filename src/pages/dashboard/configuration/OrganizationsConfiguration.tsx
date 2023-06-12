import React, {useState} from "react";
import {Box, Button, Grid, Modal, TextField, Typography} from "@mui/material";
import {Organization} from "../../../types/Organization";
import {OrganizationsQueryResponse, useOrganizationAddMutation} from "../../../api/graphql/useOrganizationsQuery";
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
    p: 4,
};

type OrganizationsConfigurationProps = {
    organizations: Organization[];
    setCurrentOrg: React.Dispatch<React.SetStateAction<Organization | undefined>>;
    refetchOrgs: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<OrganizationsQueryResponse>>;
}

export default function OrganizationsConfiguration({organizations,setCurrentOrg,refetchOrgs}: OrganizationsConfigurationProps) {
    const [open, setOpen] = useState(false);
    const [newOrgName, setNewOrgName] = useState("");
    const [addOrgMutation, addOrgProps] = useOrganizationAddMutation();

    function addOrg() {
        if(newOrgName.length!==0) {
            addOrgMutation({
                variables: {
                    name: newOrgName
                }
            }).then(value => {
                refetchOrgs();
            });
        }
        setNewOrgName("");
        setOpen(false);
    }

    return (
        <Grid item xs={3} sx={{backgroundColor: "white", minHeight: 900}} p={1}>
            <Typography variant={"h5"} textAlign={"center"} p={2}>
                Organizations
            </Typography>
            <Box display={"flex"} justifyContent={"space-between"}>
                <Button fullWidth variant={"outlined"} onClick={() => setOpen(true)}>Add</Button>
            </Box>
            {organizations.map(value =>
                <Box key={value.id} display={"flex"} justifyContent={"space-between"} borderBottom={"1px solid gray"}>
                    <Box display={"flex"} alignItems={"center"}>{value.name}</Box>
                    <Button onClick={() => setCurrentOrg(value)}>Details</Button>
                </Box>
            )}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add organization
                    </Typography>
                    <TextField
                        label={"Org name"}
                        variant={"standard"}
                        value={newOrgName}
                        fullWidth
                        onChange={event => setNewOrgName(event.target.value)}
                    />
                    <Box display={"flex"} justifyContent={"right"}>
                        <Button onClick={addOrg}>Save</Button>
                    </Box>
                </Box>
            </Modal>
        </Grid>
    )
}