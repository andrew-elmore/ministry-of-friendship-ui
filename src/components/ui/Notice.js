import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Alert, Typography } from '@mui/joy';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Message } from 'domain';

const DEFAULT_SETTINGS = {
    [Message.TYPE_ERROR]: { titleText: 'Error', color: 'danger', icon: <ReportIcon /> },
    [Message.TYPE_WARN]: { titleText: 'Warning', color: 'warning', icon: <WarningIcon /> },
    [Message.TYPE_SUCCESS]: { titleText: 'Success', color: 'success', icon: <CheckCircleIcon /> },
    [Message.TYPE_INFO]: { titleText: 'Notice', color: 'neutral', icon: <InfoIcon /> },
}

const Notice = ({ message, enabled }) => {
    const [shouldRender, setShouldRender] = useState(enabled);
    const [maxHeight, setMaxHeight] = useState('0px');
    const messageBoxRef = useRef(null);
    const transitionDuration = 500;


    const { title, type, details } = message;
    const defaultSettings = DEFAULT_SETTINGS[type] ?? DEFAULT_SETTINGS[Message.TYPE_INFO]
    const { color, titleText, icon } = defaultSettings;

    useEffect(() => {
        if (enabled) {
            setShouldRender(true);
            setTimeout(() => {
                if (messageBoxRef.current) {
                    setMaxHeight(`${messageBoxRef.current.scrollHeight}px`);
                }
            }, 1);
        } else {
            setMaxHeight('0px');
            setTimeout(() => setShouldRender(false), transitionDuration);
        }
    }, [enabled, transitionDuration]);

    if (!shouldRender) return null;

    const boxStyle = {
        overflow: 'hidden',
        transition: `max-height ${transitionDuration}ms ease`,
        maxHeight: maxHeight,
    };

    return (
        <Box ref={messageBoxRef} sx={boxStyle}>
            <Alert variant="soft" color={color} startDecorator={icon}>
                <div>
                    <div>{title ?? titleText}</div>
                    <Typography level="body-sm" color={color}>
                        {details}
                    </Typography>
                </div>
            </Alert>
        </Box>
    );
};

Notice.propTypes = {
    message: PropTypes.instanceOf(Message).isRequired,
    enabled: PropTypes.bool,
};

Notice.defaultProps = {
    enabled: true,
};

export default Notice;
