import React from 'react';
import useMetricsQuery from "../../../api/graphql/useMetricsQuery";
import {Box, Skeleton, Toolbar} from "@mui/material";
import MetricsTree from "./MetricsTree";

type MetricsProps = {
    orgId: string;
    setAlert: React.Dispatch<React.SetStateAction<any>>;
}
export default function Metrics({orgId, setAlert}: MetricsProps) {
    const {data, error, loading} = useMetricsQuery(orgId);
    if (error) {
        setAlert(error);
        return (
            <>Error</>
        )
    }
    if (loading) {
        return (
            <Skeleton variant="rectangular" width={210} height={118}/>
        )
    }
    return (
        <Box p={2}>
            {data?.metrics !== undefined
                ? <MetricsTree metrics={data?.metrics}/>
                : <></>
            }
        </Box>
    );
}