import React from 'react';
import {Grid, Paper, Typography} from "@mui/material";

type MetricGraphProps={
    metric:number|undefined;
}

export default function MetricGraph({metric}:MetricGraphProps) {
    return(
        <Grid item xs={9}>
            <Paper
                sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems:"center",
                    justifyContent:"center",
                    height: "49vh",
                    mb:1
                }}
            >
                {metric===undefined
                    ?<Typography sx={{fontSize:"xxx-large",color:"lightgray",fontWeight:"bolder"}} >
                        Please select metric
                    </Typography>
                    :<></>
                }
            </Paper>
            <Paper
                sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems:"center",
                    justifyContent:"center",
                    height: "50vh"
                }}
            >
                {metric===undefined
                    ?<Typography
                        sx={{fontSize:"xxx-large",color:"lightgray",fontWeight:"bolder"}}
                    >
                        Please select metric
                    </Typography>
                    :<></>
                }
            </Paper>
        </Grid>
    )
}