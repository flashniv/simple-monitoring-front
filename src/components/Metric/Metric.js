import React from "react";
import {Link} from "react-router-dom";
import classes from "./Metric.module.css";

function Metric(props) {
    const link = "/metricDetail/" + props.text
    const pathParts = props.text.split(".")
    return (
        <Link className={classes.MetricLink} to={link}>
            {pathParts.map((part, index) =>
                <>
                    {index !== 0
                        ? <span className={classes.Span}>/</span>
                        : <></>
                    }
                    <span>{part}</span>
                </>
            )}
        </Link>
    );
}

export default Metric;
