import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@mui/joy';

import Box from '../core/Box';
import Grid from '../core/Grid';
import Stack from '../core/Stack';
import Typography from '../core/Typography';

const easeOutCubic = (t) => {
    return 1 - Math.pow(1 - t, 3);
};

const StatBox = ({ value = '0', description = '', duration = 1000 }) => {
    const theme = useTheme();

    const [currentValue, setCurrentValue] = useState(0);

    const matches =
    String(value).match(/^([^0-9\.]+)?([0-9\.]+)([^0-9\.]+)?$/) || [];

    const valuePrefix = matches.length > 1 && matches[1] ? matches[1] : '';

    const numberValue = matches.length > 2 ? parseFloat(String(matches[2])) : 0;

    const isWholeNumber = numberValue === parseInt(String(numberValue));

    const valueSuffix = matches.length > 3 && matches[3] ? matches[3] : '';

    useEffect(() => {
        const startTime = performance.now();

        const animate = (time) => {
            const elapsed = time - startTime;
            const progress = Math.max(Math.min(elapsed / duration, 1), 0);

            const easedProgress = easeOutCubic(progress);
            const currentValue = numberValue * easedProgress;

            setCurrentValue(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, []);

    return (
        <Grid item xs={12} md={3}>
            <Stack spacing={2} alignItems='center'>
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    sx={{
                        height: '10rem',
                        minWidth: '10rem',
                        backgroundColor: theme.palette.secondary[500],
                        borderRadius: '2rem',
                    }}
                >
                    <Typography sx={{ fontSize: '3rem', fontWeight: '600', margin: '1rem' }}>
                        {valuePrefix}
                        {parseFloat(currentValue.toFixed(isWholeNumber ? 0 : 2))}
                        {valueSuffix}
                    </Typography>
                </Box>
                <Typography level='h3' align='center'>
                    {description}
                </Typography>
            </Stack>
        </Grid>
    );
};

export const StatBoxGroup = ({ children }) => {
    return (
        <Stack spacing={2}>
            <Grid container spacing={3} alignItems='center' justifyContent='center'>
                {children}
            </Grid>
        </Stack>
    );
};

StatBox.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.number,
};

StatBoxGroup.propTypes = {
    children: PropTypes.node,
};

export default StatBox;
