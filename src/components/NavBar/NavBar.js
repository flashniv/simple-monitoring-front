import React, {useRef} from "react";
import NavBarItem from "../NavBarItem/NavBarItem";
import classes from "./NavBar.module.css";

function NavBar() {
    const bar=useRef(null)
    
    var showMenu=function(){
        let display=bar.current.style.display;
        if(display.localeCompare("")===0 || display.localeCompare("none")===0){
            bar.current.style.display="block"
        }else{
            bar.current.style.display="none"
        }
    }

    return (
        <>
            <div ref={bar} className={classes.NavBar}>
                <div>
                    <NavBarItem href={"/"} text={"SM"} />
                    <NavBarItem href={"/metrics"} text={"Metrics"} />
                    <NavBarItem href={"/history"} text={"History"} />
                    <NavBarItem href={"/alertFilters"} text={"Alert filters"} />
                </div>
                <div>
                    <NavBarItem href={"/logout"} text={"Logout"} />
                </div>
            </div>
            <div onClick={showMenu} className={classes.ShowMenuButton}>Menu ⇵</div>
        </>
    );
}

export default NavBar;
