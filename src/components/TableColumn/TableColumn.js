import React from "react";
import classes from "./TableColumn.module.css";

function TableColumn({text,type}){
    const isTh=type.localeCompare("th")===0
    return (
        <>
        {isTh
            ? <th className={classes.TableColumn}>{text}</th>
            : <td className={classes.TableColumn}>{text}</td>
        }
        </>
    );
}

export default TableColumn;
