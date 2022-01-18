import {useEffect, useState} from "react";
import {Navigate} from "react-router";
import APIServer from "../../API/APIServer";
import HistoryItem from "../../components/HistoryItem/HistoryItem";
import classes from "./History.module.css";

function onError(reason) {
    console.error(reason)
}

export default function History() {
    const [onlyAlerted,setOnlyAlerted] = useState(false)
    const [onlyFiltered,setOnlyFiltered] = useState(true)
    const [filter,setFilter] = useState("")
    const [alerts, setAlerts] = useState([])

    const updateHistory = function () {
        console.log("update History")
        const response = APIServer.getContent('/apiv1/gui/history/allProblems')
        response.then((value) => {
            setAlerts(value.data)
        }, onError)
    };

    const getFiltered = function () {
        return alerts.filter(alert => {
                if (onlyFiltered && alert.isFiltered) {
                    return false
                }
                if (onlyAlerted && alert.stopDate != null) {
                    return false
                }
                if (filter.localeCompare("") !== 0) {
                    return alert.host.includes(filter)
                }

                return true
            }
        )
    };

    const clearFilter = function () {
        setOnlyAlerted(false)
        setOnlyFiltered(true)
        setFilter("")
    };

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
                            <input id="onlyFiltered" className={classes.HistoryFilterInputCheck}
                                   checked={onlyFiltered} type="checkbox" onChange={()=>setOnlyFiltered(!onlyFiltered)}/>
                            <label htmlFor="onlyFiltered">Filter</label>
                            <input id="onlyAlerted" className={classes.HistoryFilterInputCheck}
                                   checked={onlyAlerted} type="checkbox" onChange={()=>setOnlyAlerted(!onlyAlerted)}/>
                            <label htmlFor="onlyAlerted">Only alerted</label>
                        </div>
                        <div className={classes.FilterDiv}>
                            <input className={classes.HistoryFilterInputText} value={filter} placeholder="Search..."
                                   type="text" onChange={(e)=>{setFilter(e.target.value)}}/>
                            <button className={classes.HistoryFilterButton} onClick={clearFilter}>Clear</button>
                        </div>
                    </div>
                    <div className={classes.History}>
                        {!alerts.length
                            ? <div>Loading...</div>
                            : getFiltered().map(alerti => <HistoryItem alert={alerti} key={alerti.id}/>
                            )
                        }
                    </div>
                </>
                : <Navigate to="/login"/>
            }
        </>
    );
}
