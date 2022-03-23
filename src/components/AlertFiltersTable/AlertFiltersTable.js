import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import APIServer from "../../API/APIServer";

const onError=function (reason) {
    console.error(reason)
}

export default function AlertFiltersTable({rows,updateAlertFilters}) {

    const onDelete = function (data) {
        if (window.confirm("Delete it?")) {
            const response = APIServer.postContent('/apiv1/gui/configuration/alertFilters/deleteAlertFilter', {id: data})
            response.then(() => {
                updateAlertFilters()
                console.log("Delete success")
            }, onError)
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{
                                fontWeight:"bold",
                                fontSize:"large",
                                p:1
                            }}
                        >
                            Name
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight:"bold",
                                fontSize:"large",
                                p:1
                            }}
                        >
                            Expression
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight:"bold",
                                fontSize:"large",
                                p:1
                            }}
                            align="right"
                        >

                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            <TableCell
                                sx={{
                                    fontSize:"large",
                                    p:1
                                }}
                                component="th"
                                scope="row"
                            >
                                {row.name}
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontSize:"large",
                                    p:1
                                }}
                            >
                                {row.expression}
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontSize:"large",
                                    p:1
                                }}
                                align="right"
                            >
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={()=>onDelete(row.id)}
                                >
                                    Del
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}