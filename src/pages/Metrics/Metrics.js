import {useEffect, useState} from "react";
import APIServer from "../../API/APIServer";
import {useNavigate} from "react-router";
import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import {makeStyles} from "@mui/styles";
import {Box, Button, TextField} from "@mui/material";

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
    const [filter, setFilter] = useState("")
    const [treeItems, setTreeItems] = useState([])
    const [expand,setExpand]=useState(['0'])
    const navigate = useNavigate()
    const classes = useStyles();

    const clearFilter = function () {
        setFilter("")
    };

    const handleToggle = (event, nodeIds) => {
        setExpand(nodeIds);
    };
    const expandAll = function () {
        if(expand.length<=1) {
            setExpand(Array(treeItems.length).fill().map((element, index) => '' + index))
        }else{
            setExpand(['0'])
        }
    }
    const getFiltered = function (inputItems) {
        let items
        let i = 0;
        let newItems = {
            id: i,
            name: "root",
            path: "",
            childs: {}
        }
        //filter
        if (filter.localeCompare("") !== 0) {
            items = inputItems.filter(item => {
                    return item.path.includes(filter)
                }
            )
        } else {
            items = inputItems
        }
        //create tree
        items.map((metricPath) => {
            let head = newItems
            metricPath.path.split('.').map((part) => {
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

        return newItems
    }

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
        const response = APIServer.getContent('/apiv1/gui/metrics/allMetrics')
        response.then((value) => {
            setTreeItems(value.data)
        }, onError)
    }

    useEffect(
        updateMetrics,
        []
    )

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    backgroundColor: "white",
                    alignItems: "center",
                    mb: 1,
                    p: 1,
                    pl: 2
                }}
            >
                <TextField
                    id="outlined-required"
                    label="Search"
                    sx={{
                        width: 300,
                        mr: 2
                    }}
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value)
                    }}
                />
                <Button variant="contained" onClick={clearFilter} sx={{height: 35, mr:2}}>Clear</Button>
                <Button variant="contained" onClick={expandAll} sx={{height: 35}}>{expand.length<=1?"Expand all":"Collapse all"}</Button>
            </Box>
            <Box
                sx={{
                    backgroundColor: "white",
                    minHeight: 900,
                    p: 2
                }}
            >
                <TreeView
                    aria-label="file system navigator"
                    expanded={expand}
                    defaultCollapseIcon={<ExpandMoreIcon/>}
                    defaultExpandIcon={<ChevronRightIcon/>}
                    onNodeToggle={handleToggle}
                    sx={{
                        //height: 240,
                        flexGrow: 1,
                        width: '70%',
                        overflowY: 'auto',
                    }}
                >
                    {renderTree(getFiltered(treeItems))}
                </TreeView>
            </Box>
        </>
    );
}

export default Metrics;
