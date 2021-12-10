import React from "react";
import NavBarItem from "../NavBarItem/NavBarItem";
import classes from "./NavBar.module.css";

function NavBar(){
    return (
        <div className={classes.NavBar}>
            <NavBarItem href={"/"} text={"SM"} />
            <NavBarItem href={"/metrics"} text={"Metrics"} />
            <NavBarItem href={"/history"} text={"History"} />
        </div>
    );
}

export default NavBar;
