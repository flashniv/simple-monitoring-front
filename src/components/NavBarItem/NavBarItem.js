import React from "react";
import { Link } from "react-router-dom";
import classes from "./NavBarItem.module.css";

function NavBarItem(props){
    return (
        <Link className={classes.NavBarItem} to={props.href}>
            {props.text}
        </Link>
    );
}

export default NavBarItem;
