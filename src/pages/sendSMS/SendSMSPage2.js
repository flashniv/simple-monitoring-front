import React from "react"
import {Stack, TextField, Typography} from "@mui/material";

export default function SendSMSPage2({selectionUsers,smsText,setSMSText}) {
    function onChange(e) {
        if(e.target.value.length<70){
            setSMSText(e.target.value)
        }
    }

    return(
        <Stack
            pt={3}
            spacing={2}
        >
            <TextField
                id="outlined-multiline-static"
                label="Text for send (70 chars)"
                multiline
                rows={4}
                value={smsText}
                onChange={onChange}
            />
            <Typography variant={"h6"} textAlign={"right"} >
                You can sent SMS to {selectionUsers.length} users. Click Send
            </Typography>
        </Stack>
    )
}