import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router";
import APIServer from "../../API/APIServer";
import Metric from "../../components/Metric/Metric";
import classes from "./Metrics.module.css";

function onError(reason) {
    console.error(reason)
}

var rawMetrics = []

function Metrics() {
    const [metrics, setMetrics] = useState([])
    const filter = useRef(null)

    var addMetric = function (path) {
        rawMetrics = [...rawMetrics, path]
    }
    var updateMetrics = function () {
        console.log("update metrics")
        const response = APIServer.getContent('/apiv1/gui/metrics/allMetrics')
        response.then((value) => {
            rawMetrics = []
            value.data.map(jsonMetric =>
                addMetric(jsonMetric.path)
            )
            updateFilters()
        }, onError)
    }

    var updateFilters = function () {
        var newArray = rawMetrics.filter(metric => {
            if (filter.current.value.localeCompare("") != 0) {
                return metric.includes(filter.current.value)
            }
            return true
        }
        )
        setMetrics([...newArray])
    }
    var clearFilter = function () {
        filter.current.value = ""
        updateFilters()
    }

    useEffect(
        updateMetrics,
        []
    )

    return (
        <>
            {APIServer.isLoggedIn()
                ? <>
                    <div className={classes.MetricsFilter}>
                        <input className={classes.MetricsFilterInput} ref={filter} type="text" placeholder="Search..." onChange={updateFilters} />
                        <button className={classes.MetricsFilterButton} onClick={clearFilter}>Clear</button>
                    </div>
                    <div className={classes.Metrics}>
                        {metrics.map(metric =>
                            <Metric text={metric} key={metric} />
                        )}
                    </div>
                </>
                : <Navigate to="/login" />
            }
        </>
    );
}

export default Metrics;
