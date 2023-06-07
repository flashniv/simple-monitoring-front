import * as React from 'react';
import {useEffect, useState} from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import {Metric} from "../../../types/Metric";
import {Grid, Paper} from "@mui/material";

type TreeJsonItem = {
    id: number;
    name: string;
    path: string;
    childs: Record<string, TreeJsonItem>;
}

type MetricsTreeProps = {
    metrics: Metric[];
}

export default function MetricsTree({metrics}: MetricsTreeProps) {
    const [treeItems, setTreeItems] = useState<TreeJsonItem>({id: 0, name: "metrics", path: "", childs: {}})

    useEffect(() => {
        let i = 0;
        let newItems: TreeJsonItem = {
            id: i,
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
                <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon/>}
                    defaultExpandIcon={<ChevronRightIcon/>}
                    sx={{
                        flexGrow: 1,
                        overflowY: 'auto'
                    }}
                >
                    {renderTree(treeItems)}
                </TreeView>
            </Paper>
        </Grid>
    );
}