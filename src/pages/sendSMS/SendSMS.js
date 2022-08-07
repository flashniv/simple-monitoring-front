import React, {useEffect, useState} from "react";
import {Alert, Box, Button, Container} from "@mui/material";
import SendSMSPage1 from "./SendSMSPage1";
import SendSMSPage2 from "./SendSMSPage2";
import API from "../../API/API";

export default function SendSMS({setAlert, setTitle}) {
    const [currentPage, setCurrentPage] = useState(1)
    const [selectionUsers, setSelectionUsers] = React.useState([]);
    const [smsText,setSMSText] = useState("")

    useEffect(() => {
        setTitle("Send SMS")
    }, [])

    function sendClick() {
        if(window.confirm("Are you sure you want to send "+selectionUsers.length+" SMS?")){
            API.sendSMS(smsText,selectionUsers,()=>{
                setAlert(<Alert severity={"success"}>Messages was sent!</Alert>)
                setCurrentPage(1)
                setSMSText("")
                setSelectionUsers([])
            },(reason)=>{
                setAlert(<Alert severity={"error"}>Server error!</Alert>)
            })
        }
    }

    return (
        <Box
            sx={{
                backgroundImage: "url(\"/images/background.png\")",
                backgroundPosition: "center",
                backgroundRepeat: "repeat",
                minHeight: "94vh",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Container
                sx={{backgroundColor: "rgba(255,255,255,0.93)"}}
                maxWidth="xl"
            >
                {currentPage === 1
                    ? <>
                        <SendSMSPage1 setAlert={setAlert} setSelectionUsers={setSelectionUsers}/>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "right",
                                p: 2
                            }}
                        >
                            <Button
                                disabled={selectionUsers.length === 0}
                                variant={"contained"}
                                onClick={()=>setCurrentPage(2)}
                            >
                                Next
                            </Button>
                        </Box>
                    </>
                    : <></>
                }
                {currentPage === 2
                    ? <>
                        <SendSMSPage2 selectionUsers={selectionUsers} smsText={smsText} setSMSText={setSMSText}/>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "right",
                                p: 2
                            }}
                        >
                            <Button
                                disabled={smsText.length === 0}
                                variant={"contained"}
                                onClick={sendClick}
                            >
                                Send
                            </Button>
                        </Box>
                    </>
                    : <></>
                }
            </Container>
        </Box>
    )
}