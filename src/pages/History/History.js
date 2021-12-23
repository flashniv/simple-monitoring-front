import {useEffect, useRef, useState} from "react";
import {Navigate} from "react-router";
import APIServer from "../../API/APIServer";
import HistoryItem from "../../components/HistoryItem/HistoryItem";
import classes from "./History.module.css";

function onError(reason) {
    console.error(reason)
}

var rawAlerts = []

function History() {
    const onlyAlerted = useRef(null)
    const onlyFiltered = useRef(null)
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
            value.data.forEach(jsonAlert => {
                addAlert(jsonAlert)
            }
            )
            updateFilters()
        }, onError)
    }

    var updateFilters = function () {
        var newArray = rawAlerts.filter(alert => {
            if (onlyFiltered.current.checked && alert.isFiltered) {
                return false
            }
            if (onlyAlerted.current.checked && alert.stopDate != null) {
                return false
            }
            if (filter.current.value.localeCompare("") !== 0) {
                return alert.host.includes(filter.current.value)
            }

            return true
        }
        )
        setAlerts([...newArray])
    }

    var clearFilter = function () {
        onlyAlerted.current.checked = false
        filter.current.value = ""
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return (
        <>
            {APIServer.isLoggedIn()
                ? <>
                    <div className={classes.HistoryFilter}>
                        <div className={classes.FilterDiv}>
                            <input id="onlyFiltered" className={classes.HistoryFilterInputCheck} ref={onlyFiltered} defaultChecked="true" type="checkbox" onChange={updateFilters} />
                            <label htmlFor="onlyFiltered">Filter</label>
                            <input id="onlyAlerted" className={classes.HistoryFilterInputCheck} ref={onlyAlerted} type="checkbox" onChange={updateFilters} />
                            <label htmlFor="onlyAlerted">Only alerted</label>
                        </div>
                        <div className={classes.FilterDiv}>
                            <input className={classes.HistoryFilterInputText} ref={filter} placeholder="Search..." type="text" onChange={updateFilters} />
                            <button className={classes.HistoryFilterButton} onClick={clearFilter}>Clear</button>
                        </div>
                    </div>
                    <div className={classes.History}>
                        {!rawAlerts.length
                            ? <div>Loading...</div>
                            : alerts.forEach(alerti =>
                                <HistoryItem alert={alerti} key={alerti.id} />
                            )
                        }
                    </div>
                </>
                : <Navigate to="/login" />
            }
        </>
    );
}

export default History;
