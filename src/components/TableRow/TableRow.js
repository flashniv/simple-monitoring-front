import React from "react";
import TableColumn from "../TableColumn/TableColumn";
import TableHeadColumn from "../TableHeadColumn/TableHeadColumn";
import classes from "./TableRow.module.css";

function TableRow({row,type}){
    return (
        <tr className={classes.TableRow}>
            {row.map((col,index) =>
                <TableColumn text={col} type={type} key={index}/>
            )}
        </tr>
    );
}

export default TableRow;
