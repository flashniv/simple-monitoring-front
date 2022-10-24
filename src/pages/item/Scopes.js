import React from "react";
import {Grid} from "@mui/material";

const multipliers=["","K","M","G","E","P"];

const headerStyleName={
    fontWeight:"bold",
    borderBottom:"1px solid black"
};
const headerStyle={
    textAlign:"right",
    fontWeight:"bold",
    borderBottom:"1px solid black"
};
const bodyStyleName={
    borderBottom:"1px solid lightgray"
}
const bodyStyle={
    textAlign:"right",
    borderBottom:"1px solid lightgray"
};

function Scope({parameter}) {
    return(
        <>
            {parameter.scopes !== undefined
                ? <>
                    <Grid sx={bodyStyleName} xs={2} item>
                        {parameter.name}
                    </Grid>
                    <Grid sx={bodyStyle} xs={2} item>
                        {+parameter.scopes.last.toFixed(3)} {multipliers[parameter.multiplier]}
                    </Grid>
                    <Grid sx={bodyStyle} xs={2} item>
                        {+parameter.scopes.min.toFixed(3)} {multipliers[parameter.multiplier]}
                    </Grid>
                    <Grid sx={bodyStyle} xs={2} item>
                        {+parameter.scopes.avg.toFixed(3)} {multipliers[parameter.multiplier]}
                    </Grid>
                    <Grid sx={bodyStyle} xs={2} item>
                        {+parameter.scopes.max.toFixed(3)} {multipliers[parameter.multiplier]}
                    </Grid>
                </>
                :<Grid
                    sx={{
                        textAlign:"center",
                        fontWeight:"bold",
                        color:"gray",
                        fontSize:"large"
                    }}
                    xs={10}
                    item
                >
                    No data
                </Grid>
            }
        </>
    )
}

export default function Scopes({parameters}) {
    return(
        <Grid container columns={{xs:10}}>
            {parameters.length !== 0 && parameters[0].multiplier !== 0
                ?<Grid
                    sx={{p: 2}}
                    xs={10}
                    item
                >
                    <b>Multiplier:</b> {multipliers[parameters[0].multiplier]}
                </Grid>
                :<></>
            }
            <Grid sx={headerStyleName} xs={2} item>
                Name
            </Grid>
            <Grid sx={headerStyle} xs={2} item>
                Last
            </Grid>
            <Grid sx={headerStyle} xs={2} item>
                Min
            </Grid>
            <Grid sx={headerStyle} xs={2} item>
                Avg
            </Grid>
            <Grid sx={headerStyle} xs={2} item>
                Max
            </Grid>
            {parameters.map(parameter=><Scope key={parameter.name} parameter={parameter}/>)}
        </Grid>
    )
}