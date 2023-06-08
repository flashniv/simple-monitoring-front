import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Title from '../Title';

export default function Chart() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Title>Today</Title>

        </React.Fragment>
    );
}
