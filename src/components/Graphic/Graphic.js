import React from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import classes from "./Graphic.module.css";

const colors=[
    "#d1b066",
"#66e3ca",
"#50ba74",
"#4d6179",
"#e59864",
"#97f93b",
"#cfbb7d",
"#abc494",
"#3eb4a3",
"#3eef15",
"#53ebe7",
"#1071c2a",
"#975236",
"#8ba782",
"#ad5ac8",
"#2432e9",
"#4fd502",
"#a6a030",
"#12a936d",
"#eb8b08",
"#f98aa3",
"#3719e4",
"#883dfe",
"#6957ef",
"#992e05",
"#c509f0",
"#110a869",
"#2a334a",
"#1ca068",
"#97a2f9",
"#bd99e0",
"#519ace",
"#10bcd0d",
"#bd4fc6",
"#5006a",
"#9d6fcd",
"#edcd59",
"#550790",
"#24da20",
"#be676b",
"#c695e5",
"#9d1752",
"#126d071",
"#c5d34e",
"#11eb9d6",
"#d08fc9",
"#d3474",
"#1177680",
"#b19d1a",
"#743b8c",
"#12c28a9",
"#1a8867",
"#de1ed",
"#103b28a",
"#579ce4",
"#129492f",
"#e0188",
"#61d7cb",
"#47de78",
"#1255f7f",
"#8a84dd",
"#127d82e",
"#7b36cd",
"#83863f",
"#7316f4",
"#2561d2",
"#b38edc",
"#80c96f",
"#105f2e1",
"#3ca805",
"#10604c9",
"#9d573e",
"#7160db",
"#247876",
"#caa1",
"#cd2b2e",
"#c56cb1",
"#12111b9",
"#cd623f",
"#e3ddc8",
"#66158c",
"#e969eb",
"#b75dc",
"#12d01ae",
"#115464e",
"#d11cc7",
"#10a05ab",
"#db33f8",
"#dc0936",
"#59f570",
"#989268",
"#105566e",
"#de89d3",
"#1f68f8",
"#11ed552",
"#e388ce",
"#11dc8ea",
"#f6a75d",
"#e09766",
"#107fb02"
]

function Graphic(props) {
    const data = props.data
    let row=[]
    if(data[0]!=null){
        row = Object.keys(data[0]).filter(item => item.localeCompare("time")!=0)
    }
    return (
        <LineChart width={props.width} height={400} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5, }} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            {row.map((line,index) =>
                <Line type="monotone" dataKey={line} stroke={colors[index]} key={index} />
            )}
        </LineChart>

    );
}

export default Graphic;
