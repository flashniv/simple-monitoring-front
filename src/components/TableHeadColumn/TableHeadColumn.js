import React from "react";
import classes from "./TableHeadColumn.module.css";

function TableHeadColumn({text}){
    return (
        <th className={classes.TableHeadColumn}>
            {text}
        </th>
    );
}

export default TableHeadColumn;
