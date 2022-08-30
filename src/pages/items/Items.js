import React, {useEffect, useState} from "react"
import {Alert, Backdrop, Button, CircularProgress, Grid, TextField} from "@mui/material";
import API from "../../API/API";
import {useNavigate} from "react-router-dom";

const cellStyle = {
    borderBottom: "1px solid lightgrey",
    wordWrap: "break-word",
    cursor:"pointer",
    pl: 2,
    pr: 2,
    pt: 1,
    pb: 1,
    width: "100%"
}

export default function Items({setAlert, setTitle}) {
    const [items, setItems] = useState(undefined)
    const [filter, setFilter] = useState("")
    const navigate = useNavigate()

    function updItems() {
        API.getItems((newItems) => {
            let arrItems = []
            newItems.map((item) => {
                arrItems.push(item.path)
            })
            setItems(arrItems)
        }, (reason) => {
            setAlert(<Alert severity={"error"}>Server error!</Alert>)
        })
    }
    function rowClick(item) {
        navigate("/item/" + item)
    }

    function filterFunc(item) {
        return item.includes(filter)
    }

    useEffect(() => {
        setTitle("Items")
        updItems()
    }, [])

    return (
        <>
            {items !== undefined
                ? <Grid container>
                    <Grid item sx={{pl: 2, pr: 2, pt: 1, pb: 1}}>
                        <TextField
                            variant={"outlined"}
                            size={"small"}
                            value={filter}
                            sx={{minWidth: "310px"}}
                            onChange={event => setFilter(event.target.value)}
                        />
                        <Button
                            variant={"contained"}
                            color={"error"}
                            onClick={() => setFilter("")}
                            sx={{ml: 1}}
                        >X</Button>
                    </Grid>
                    {items.filter(filterFunc).sort().map((item, index) =>
                        <Grid key={index} sx={cellStyle} item onClick={()=>rowClick(item)}>{item}</Grid>
                    )}
                </Grid>
                : <Backdrop open={true} sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            }
        </>
    )
}