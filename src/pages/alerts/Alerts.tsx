import React from 'react';
import useTriggersQuery from "../../api/graphql/useTriggersQuery";
import {Box, Skeleton} from "@mui/material";
import TriggersTimeLine from "./TriggersTimeLine";

type AlertsProps = {
    orgId: string;
    setAlert: React.Dispatch<React.SetStateAction<any>>;
}

export default function Alerts({orgId, setAlert}: AlertsProps) {
    const {data, error, loading, refetch} = useTriggersQuery(orgId);
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
            <Box pl={2} pr={2} pb={2} pt={3}>
                <Skeleton variant="rectangular" height={"100vh"}/>
            </Box>
        )
    }
    console.log(data?.triggers);
    return (
        <Box pl={2} pr={2} pb={2} pt={3}>
            {data?.triggers !== undefined
                ? <TriggersTimeLine triggers={[...data?.triggers]}/>
                : <>Error</>
            }
        </Box>
    );
}