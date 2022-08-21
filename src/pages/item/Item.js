import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {Backdrop, CircularProgress} from "@mui/material";

export default function Item({setAlert, setTitle}) {
    const {itemId} = useParams()
    const [events,setEvents]=useState(undefined)

    return (
        <>
            {events!==undefined
                ?<>item</>
                : <Backdrop open={true} sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            }
        </>
    );
}
