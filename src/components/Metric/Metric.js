import React from "react";
import { Link } from "react-router-dom";
import classes from "./Metric.module.css";

function Metric(props){
    const link="/metricDetail/"+props.text
    return (
        <div className={classes.Metric}>
            <Link className={classes.MetricLink} to={link}>
                {props.text}
            </Link>
        </div>
    );
}

export default Metric;
