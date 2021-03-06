import React from "react";
import TableColumn from "../TableColumn/TableColumn";
import classes from "./TableRow.module.css";

function TableRow({columns,row,type}){
    return (
        <tr className={classes.TableRow}>
            {row.map((col,index) =>
                <TableColumn column={columns[index]} text={col} type={type} key={index}/>
            )}
        </tr>
    );
}

export default TableRow;
