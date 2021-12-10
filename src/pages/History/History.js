import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router";
import APIServer from "../../API/APIServer";
import HistoryItem from "../../components/HistoryItem/HistoryItem";
import classes from "./History.module.css";

function onError(reason) {
    console.error(reason)
}

var rawAlerts = []

function History() {
    const onlyAlerted = useRef(null)
    const filter = useRef(null)
    const [alerts, setAlerts] = useState([])

    var addAlert = function (newAlert) {
        rawAlerts = [...rawAlerts, newAlert]
    }
    var updateHistory = function () {
        console.log("update History")
        const response = APIServer.getContent('/apiv1/gui/history/allProblems')
        response.then((value) => {
            rawAlerts = []
            value.data.map(jsonAlert => {
                addAlert(jsonAlert)
            }
            )
            updateFilters()
        }, onError)
    }

    var updateFilters = function () {
        var newArray = rawAlerts.filter(alert => {
            if (onlyAlerted.current.checked && alert.stopDate != null) {
                return false
            }
            if (filter.current.value.localeCompare("") != 0) {
                return alert.host.includes(filter.current.value)
            }

            return true
        }
        )
        setAlerts([...newArray])
    }

    var clearFilter = function(){
        onlyAlerted.current.checked=false
        filter.current.value=""
        updateFilters()
    }

    useEffect(
        () => {
            updateHistory()
            let id = setInterval(() => {
                updateHistory()
            }, 60000);
            return () => clearInterval(id);
        },
        []
    )

    return (
        <>
            {APIServer.isLoggedIn()
                ?
                <div className={classes.History}>
                    <div className={classes.HistoryFilter}>
                            <input className={classes.HistoryFilterInputCheck} ref={onlyAlerted} type="checkbox" onChange={updateFilters} />
                            <input className={classes.HistoryFilterInputText} ref={filter} placeholder="Search..." type="text" onChange={updateFilters} />
                            <button className={classes.HistoryFilterButton} onClick={clearFilter}>Clear</button>
                    </div>
                    {!rawAlerts.length
                        ? <div>Loading...</div>
                        : alerts.map(alerti =>
                            <HistoryItem alert={alerti} key={alerti.id} />
                        )
                    }
                </div>
                : <Navigate to="/login" />
            }
        </>
    );
}

export default History;
