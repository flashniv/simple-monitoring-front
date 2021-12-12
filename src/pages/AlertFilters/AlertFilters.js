import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";
import APIServer from "../../API/APIServer";
import Table from "../../components/Table/Table";
import classes from "./AlertFilters.module.css";

function onError(reason) {
    console.error(reason)
}

function AlertFilters() {
    const [alertFilters, setAlertFilters] = useState([])
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    if (Object.keys(errors).length !== 0) {
        console.error(errors)
    }

    const columns = [
        { colTitle: "Name", colName: "name" },
        { colTitle: "Expression", colName: "expression" },
        { colTitle: "", colName: "buttons" }
    ]

    var onAdd = function (data){
        const response=APIServer.postContent('/apiv1/gui/configuration/alertFilters/addAlertFilter',data)
        response.then((value)=>{
            updateAlertFilters()
            console.log("Add success")
        },onError)
}

    var onDelete = function (data) {
        if(window.confirm("Delete it?")){
            const response=APIServer.postContent('/apiv1/gui/configuration/alertFilters/deleteAlertFilter',{id:data})
            response.then((value)=>{
                updateAlertFilters()
                console.log("Delete success")
            },onError)
        }
    }

    var updateAlertFilters = function () {
        console.log("update AlertFilters")
        const response = APIServer.getContent('/apiv1/gui/configuration/alertFilters/allAlertFilters')
        response.then((value) => {
            let filters = []
            value.data.map(alertFilter => {
                alertFilter.buttons=<button className={classes.AlertFiltersButton} onClick={()=>{onDelete(alertFilter.id)}}>X</button>
                filters.push(alertFilter)
            })
            setAlertFilters(filters)
        }, onError)
    }

    useEffect(
        updateAlertFilters,
        []
    )

    return (
        <>
            {APIServer.isLoggedIn()
                ? <>
                    <div className={classes.AlertFiltersDiv}>
                        <form onSubmit={handleSubmit(onAdd)}>
                            <input type="text" className={classes.AlertFiltersInput} placeholder="Name..." {...register("name", {})} />
                            <input type="text" className={classes.AlertFiltersInput} placeholder="Expression..." {...register("expression", {})} />
                            <input type="submit" value="+" className={classes.AlertFiltersButton} />
                        </form>
                    </div>
                    <div className={classes.AlertFilters}>
                        <Table rows={alertFilters} columns={columns} />
                    </div>
                </>
                : <Navigate to="/login" />
            }
        </>
    );
}

export default AlertFilters;