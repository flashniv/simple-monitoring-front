import * as React from 'react';
import {useEffect, useState} from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import {Metric} from "../../../types/Metric";
import {Grid, Paper, Typography} from "@mui/material";

type TreeJsonItem = {
    id: number;
    metricId: number;
    name: string;
    path: string;
    childs: Record<string, TreeJsonItem>;
}

type MetricsTreeProps = {
    metrics: Metric[];
    setSelectedMetrics: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function MetricsTree({metrics, setSelectedMetrics}: MetricsTreeProps) {
    const [treeItems, setTreeItems] = useState<TreeJsonItem>({
        id: 0,
        metricId: 0,
        name: "metrics",
        path: "",
        childs: {}
    })

    const openDetails = function (node: TreeJsonItem) {
        if (Object.keys(node.childs).length === 0 && node.metricId!==-1) {
            setSelectedMetrics(node.metricId);
        }
    }

    useEffect(() => {
        let i = 0;
        let newItems: TreeJsonItem = {
            id: i,
            metricId: -1,
            name: "items",
            path: "",
            childs: {}
        }
        metrics.map((metric) => {
            let head = newItems
            metric.name.split('.').map((part, index) => {
                if (!head.childs.hasOwnProperty(part)) {
                    head.childs[part] = {
                        id: ++i,
                        metricId:metric.id,
                        name: part,
                        path: metric.name,
                        childs: {}
                    }
                }
                head = head.childs[part]
            })
        })
        setTreeItems(newItems)
    }, [metrics]);

    const renderTree = (nodes: TreeJsonItem) => (
        <TreeItem
            key={'' + nodes.id}
            nodeId={'' + nodes.id}
            label={nodes.name}
            onClick={() => openDetails(nodes)}
        >
            {Object.keys(nodes.childs).length !== 0
                ? Object.keys(nodes.childs).map((node) => renderTree(nodes.childs[node]))
                : null
            }
        </TreeItem>
    );

    return (
        <Grid item xs={3}>
            <Paper
                sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height: "100vh"
                }}
            >
                <Typography textAlign={"center"} fontWeight={"bold"}>Metrics</Typography>
                <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon/>}
                    defaultExpandIcon={<ChevronRightIcon/>}
                    sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        border: "1px solid lightgray"
                    }}
                >
                    {renderTree(treeItems)}
                </TreeView>
            </Paper>
        </Grid>
    );
}