import {useEffect, useState} from "react";
import APIServer from "../../API/APIServer";
import {DataGrid} from "@mui/x-data-grid";
import {Button} from "@mui/material";
import {useNavigate} from "react-router";

function Metrics() {
    const [metrics, setMetrics] = useState([])
    const navigate=useNavigate()
    const onError=function (reason) {
        console.error(reason)
    }

    const openDetails=function (path){
        navigate("/metricDetail/"+ path,{replace:false})
    }

    const columns = [
        {
            field: 'path',
            headerName: 'Detail',
            flex:0.4,
            editable: false,
            renderCell: (params) => (
                <Button
                    onClick={()=>openDetails(params.value)}
                    variant="contained"
                >
                    Open
                </Button>
            ),
        },
        {
            field: 'level1',
            headerName: 'Level 1',
            flex:0.45,
            editable: false,
        },
        {
            field: 'level2',
            headerName: 'Level 2',
            flex:1,
            editable: false,
        },
        {
            field: 'level3',
            headerName: 'Level 3',
            flex:1,
            editable: false,
        },
        {
            field: 'level4',
            headerName: 'Level 4',
            flex:1,
            editable: false,
        },
        {
            field: 'level5',
            headerName: 'Level 5',
            flex:1,
            editable: false,
        },
        {
            field: 'level6',
            headerName: 'Level 6',
            flex:1,
            editable: false,
        },
    ];

    const updateMetrics = function () {
        console.log("update metrics")
        let newMetrics=[]
        const response = APIServer.getContent('/apiv1/gui/metrics/allMetrics')
        response.then((value) => {
            value.data.map((metricPath)=>{
                let newMetric={
                    path:metricPath.path,
                    level1:"",
                    level2:"",
                    level3:"",
                    level4:"",
                    level5:"",
                    level6:"",
                }
                metricPath.path.split(".").map((part,index)=>{
                    newMetric['level'+(index+1)]=part
                })
                newMetrics.push(newMetric)
            })
            setMetrics(newMetrics)
        }, onError)
    }

    useEffect(
        updateMetrics,
        []
    )

    return (
        <div style={{ height: 650, width: '100%' }}>
            <DataGrid
                sx={{
                    fontSize:"larger"
                }}
                rows={metrics}
                columns={columns}
                pageSize={15}
                rowsPerPageOptions={[15,50,100,200]}
                rowHeight={35}
                disableSelectionOnClick={true}
                getRowId={(row) => row.path}
            />
        </div>
    );
}

export default Metrics;
