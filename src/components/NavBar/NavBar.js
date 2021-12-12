import React from "react";
import NavBarItem from "../NavBarItem/NavBarItem";
import classes from "./NavBar.module.css";

function NavBar() {
    return (
        <div className={classes.NavBar}>
            <div>
                <NavBarItem href={"/"} text={"SM"} />
                <NavBarItem href={"/metrics"} text={"Metrics"} />
                <NavBarItem href={"/history"} text={"History"} />
                <NavBarItem href={"/alertFilters"} text={"Alert filters"} />
            </div>
            <NavBarItem href={"/logout"} text={"Logout"} />
        </div>
    );
}

export default NavBar;
