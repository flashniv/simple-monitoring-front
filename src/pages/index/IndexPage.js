import React, {useEffect} from "react";
import {Box, Container, Typography} from "@mui/material";

export default function IndexPage({setTitle}) {
    useEffect(() => {
        setTitle("")
    }, [])

    return (
        <Box
            sx={{
                backgroundImage: "url(\"/background.jpg\")",
                backgroundSize: "100%",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                pt: 7,
                pb: 7
            }}
        >
            <Container
                sx={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    height: "510px",
                    p: 3
                }}

                maxWidth="md"
            >
                <Typography component="h1" variant="h3" textAlign="center">
                    Simple monitoring
                </Typography>
                <Box mt={2} mb={2}>
                    Software monitors occur more commonly, sometimes as a part of a widget engine. These monitoring
                    systems are often used to keep track of system resources, such as CPU usage and frequency, or the
                    amount of free RAM. They are also used to display items such as free space on one or more hard
                    drives, the temperature of the CPU and other important components, and networking information
                    including the system IP address and current rates of upload and download. Other possible displays
                    may include the date and time, system uptime, computer name, username, hard drive S.M.A.R.T. data,
                    fan speeds, and the voltages being provided by the power supply.
                </Box>
                <Box mb={2}>
                    Less common are hardware-based systems monitoring similar information. Customarily these occupy one
                    or more drive bays on the front of the computer case, and either interface directly with the system
                    hardware or connect to a software data-collection system via USB. With either approach to gathering
                    data, the monitoring system displays information on a small LCD panel or on series of small analog
                    or LED numeric displays. Some hardware-based system monitors also allow direct control of fan
                    speeds, allowing the user to quickly customize the cooling in the system.
                </Box>
                <Box>
                    A few very high-end models of hardware system monitor are designed to interface with only
                    a specific model of motherboard. These systems directly utilize the sensors built into the system,
                    providing more detailed and accurate information than less-expensive monitoring systems customarily
                    provide.
                </Box>
            </Container>
        </Box>
    )
}