import React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import AlertsSummary from "./AlertsSummary";
import {Container, Skeleton} from "@mui/material";
import {useAllTriggersQuery} from "../../../api/graphql/useTriggersQuery";
import ShortSummary from "./ShortSummary";

export default function Summary() {
    const {data, loading, error, refetch} = useAllTriggersQuery();
    if (loading) {
        return (
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <Skeleton variant="rectangular" height={230}/>
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <Skeleton variant="rectangular" height={230}/>
                        </Paper>
                    </Grid>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                            <Skeleton variant="rectangular" height={330}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        );
    }
    if (error) {
        console.log(error);
        return (
            <>Error...</>
        );
    }
    return (
        <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        <Chart/>
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                    >
                        {data?.triggers !== undefined ?
                            <ShortSummary triggers={data?.triggers} refetch={refetch}/> : <>Error...</>}
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        {data?.triggers !== undefined ? <AlertsSummary triggers={data?.triggers}/> : <>Error...</>}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}