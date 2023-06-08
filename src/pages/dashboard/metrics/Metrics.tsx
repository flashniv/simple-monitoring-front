import React, {useState} from 'react';
import useMetricsQuery from "../../../api/graphql/useMetricsQuery";
import {Box, Grid, Paper, Skeleton, Typography} from "@mui/material";
import MetricsTree from "./MetricsTree";
import MetricDetails from "./metric-graph/MetricDetails";

type MetricsProps = {
    orgId: string;
    setAlert: React.Dispatch<React.SetStateAction<any>>;
}
export default function Metrics({orgId, setAlert}: MetricsProps) {
    const {data, error, loading,refetch} = useMetricsQuery(orgId);
    const [selectedMetric, setSelectedMetric] = useState<number | undefined>(undefined);

    if (error) {
        setAlert(error);
        return (
            <Box pl={2} pr={2} pb={2} pt={3}>
                <>Error</>
            </Box>
        )
    }
    if (loading) {
        return (
            <Grid container columns={{xs: 3, sm: 3, md: 12, lg: 12}} spacing={2} pl={2} pr={2} pb={2} pt={3}>
                <Grid item xs={3}>
                    <Skeleton variant="rectangular" height={"100vh"}/>
                </Grid>
                <Grid item xs={9}>
                    <Skeleton variant="rectangular" height={"49vh"} sx={{mb: 1}}/>
                    <Skeleton variant="rectangular" height={"50vh"}/>
                </Grid>
            </Grid>
        )
    }
    return (
        <Grid container columns={{xs: 3, sm: 3, md: 12, lg: 12}} spacing={2} pl={2} pr={2} pb={2} pt={3}>
            {data?.metrics !== undefined
                ? <MetricsTree metrics={data?.metrics} setSelectedMetrics={setSelectedMetric} refreshMetrics={()=>refetch({orgId})}/>
                : <></>
            }
            {selectedMetric === undefined
                ? <Grid item xs={9}>
                    <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: "center",
                            justifyContent: "center",
                            height: "49vh",
                            mb: 1
                        }}
                    >
                        <Typography sx={{fontSize: "xxx-large", color: "lightgray", fontWeight: "bolder"}}>
                            Please select metric
                        </Typography>
                    </Paper>
                    <Paper
                        sx={{
                            p: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: "center",
                            justifyContent: "center",
                            height: "50vh"
                        }}
                    >
                        <Typography sx={{fontSize: "xxx-large", color: "lightgray", fontWeight: "bolder"}}>
                            Please select metric
                        </Typography>
                    </Paper>
                </Grid>
                : <MetricDetails metric={selectedMetric}/>
            }
        </Grid>
    );
}