import {useEffect, useState} from "react";
import APIServer from "../../API/APIServer";
import {useNavigate} from "react-router";
import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import {makeStyles} from "@mui/styles";
import {Box} from "@mui/material";

const onError = function (reason) {
    console.error(reason)
}
const useStyles = makeStyles({
    label: {
        display: "flex",
        height: 35,
        alignItems: "center"
    }
});


function Metrics() {
    const [treeItems, setTreeItems] = useState({id: 0, name: "root", path: "", childs: {}})
    const navigate = useNavigate()
    const classes = useStyles();

    const renderTree = (nodes) => (
        <TreeItem
            key={'' + nodes.id}
            nodeId={'' + nodes.id}
            label={nodes.name}
            onClick={() => openDetails(nodes)}
            classes={{label: classes.label}}
        >
            {Object.keys(nodes.childs).length !== 0
                ? Object.keys(nodes.childs).map((node) => renderTree(nodes.childs[node]))
                : null
            }
        </TreeItem>
    );

    const openDetails = function (node) {
        if (Object.keys(node.childs).length === 0) {
            navigate("/metricDetail/" + node.path, {replace: false})
        }
    }
    const updateMetrics = function () {
        console.log("update metrics")
        let i = 0;
        let newItems = {
            id: i,
            name: "root",
            path: "",
            childs: {}
        }
        const response = APIServer.getContent('/apiv1/gui/metrics/allMetrics')
        response.then((value) => {
            value.data.map((metricPath) => {
                let head = newItems
                metricPath.path.split('.').map((part, index) => {
                    if (!head.childs.hasOwnProperty(part)) {
                        head.childs[part] = {
                            id: ++i,
                            name: part,
                            path: metricPath.path,
                            childs: {}
                        }
                    }
                    head = head.childs[part]
                })
            })
            setTreeItems(newItems)
        }, onError)
    }

    useEffect(
        updateMetrics,
        []
    )

    return (
        <Box
            sx={{
                backgroundColor:"white",
                minHeight:900,
                p:2
            }}
        >
            <TreeView
                aria-label="file system navigator"
                defaultExpanded={['0', '1']}
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
                sx={{
                    //height: 240,
                    flexGrow: 1,
                    width: '70%',
                    overflowY: 'auto',
                }}
            >
                {renderTree(treeItems)}
            </TreeView>
        </Box>
    );
}

export default Metrics;
