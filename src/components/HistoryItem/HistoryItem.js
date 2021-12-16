import React from "react";
import classes from "./HistoryItem.module.css";

function getTimeAgo(inputDate){
    const startDate=new Date(inputDate)
    const minutesAgo=(Date.now()-startDate)/60000
    if(minutesAgo<3){
        return "just now"
    }else if(minutesAgo<7){
        return "a few minutes"
    }else if(minutesAgo<10){
        return "less 10 minutes"
    }else if(minutesAgo<30){
        return "less 30 minutes"
    }else if(minutesAgo<60){
        return "less an hour"
    }else if(minutesAgo<120){
        return "less an 2 hours"
    }else if(minutesAgo<360){
        return "less an 6 hours"
    }else if(minutesAgo<720){
        return "less an 12 hours"
    }else if(minutesAgo<1440){
        return "today"
    }else if(minutesAgo<2880){
        return "yesterday"
    }else if(minutesAgo<10080){
        return "current week"
    }else if(minutesAgo<43200){
        return "current mounth"
    }
    return "too old"
}
function getDuration(startTime,stopTime){
    if(stopTime==undefined) return ""
    const startDate=new Date(startTime)
    const stopDate=new Date(stopTime)
    
    const minutesAgo=(stopDate-startDate)/60000
    if(minutesAgo<60){
        return "("+Math.round(minutesAgo)+"m)"
    }else if(minutesAgo<1440){
        return "("+Math.round(minutesAgo/60)+"h)"
    }
    return "("+Math.round(minutesAgo/1440)+"d)"

}

function HistoryItem({alert}){
    const startDate=new Date(alert.startDate)
    
    return (
        <div className={alert.stopDate==undefined?classes.HistoryItemAlerted:classes.HistoryItemNormal}>
            <div className={classes.HistoryItemDate} title={startDate.toLocaleString()}>{getTimeAgo(alert.startDate)+"  "+getDuration(alert.startDate,alert.stopDate)}</div>
            <div className={classes.Host}>{alert.host}</div>
            <div className={classes.TriggerDescription}>{alert.triggerDescription}</div>
        </div>
    );
}

export default HistoryItem;
