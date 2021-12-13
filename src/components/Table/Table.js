import React from "react";
import TableRow from "../TableRow/TableRow";
import classes from "./Table.module.css";

function getMatrix(columns,rows){
    var matr=[];
    var cols=[];
    for (let j = 0; j < columns.length; j++) {
        const col = columns[j];
        cols.push(col.colTitle)
    }

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        var arraRow=[]
        for (let j = 0; j < columns.length; j++) {
            const col = columns[j];
            arraRow.push(row[col.colName])
        }
        matr.push(arraRow)
    }
    return [matr,cols]
}

function Table({columns,rows}){
    const [matr,cols]=getMatrix(columns,rows)
    return (
        <table className={classes.Table}>
            <thead>
                <TableRow columns={columns} row={cols} type="th" />
            </thead>
            <tbody>
                {matr.map((row,index) =>
                    <TableRow columns={columns} row={row} type="td" key={index}/>
                )}
            </tbody>
        </table>
    );
}

export default Table;
