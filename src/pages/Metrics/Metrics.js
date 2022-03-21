import {useEffect, useState} from "react";
import APIServer from "../../API/APIServer";
import Metric from "../../components/Metric/Metric";
import {DataGrid} from "@mui/x-data-grid";
import {Button} from "@mui/material";
import {useNavigate} from "react-router";

function Metrics() {
    const [metrics, setMetrics] = useState([])
    const navigate=useNavigate()
    const onError=function (reason) {
        console.error(reason)
    }

    const onOpen= function (path) {
        navigate("/metricDetail/"+path, { replace: false });
    }
    const columns = [
        {
            field: 'path',
            headerName: 'Metric',
            width: window.innerWidth-35,
            editable: false,
            renderCell: (params) => (<>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginRight: 16 }}
                        onClick={()=>{onOpen(params.value)}}
                    >
                        Open
                    </Button>
                    {params.value}
                </>
            ),
        }
    ];

    const updateMetrics = function () {
        console.log("update metrics")
        const response = APIServer.getContent('/apiv1/gui/metrics/allMetrics')
        response.then((value) => {
            setMetrics(value.data)
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
