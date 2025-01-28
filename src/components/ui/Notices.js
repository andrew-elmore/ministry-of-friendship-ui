import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Snackbar, Box, Alert, Typography} from '@mui/joy';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import appActions from "actions/appActions";
import { Notice } from 'domain';

const ICONS = {
    [Notice.TYPE_INFO]: <InfoIcon />,
    [Notice.TYPE_WARN]: <WarningIcon />,
    [Notice.TYPE_ERROR]: <ReportIcon />,
    [Notice.TYPE_SUCCESS]: <CheckCircleIcon />,
}

const Notices = () => {
    const notices = useSelector(state => state.app.notices);
    const dispatch = useDispatch();

    useEffect(() => {
        const errorHandler = (event) => {
            const { error, lineno, colno, message } = event;
            dispatch(appActions.addNotice(new Notice({
                title: 'Client Error',
                details: message,
                type: Notice.TYPE_ERROR,
                source: { error, lineno, colno },
            })));
        };

        window.addEventListener('error', errorHandler);

        return () => {
            window.removeEventListener('error', errorHandler);
        };
    }, []);

    const handleRemove = (notice) => () => {
        dispatch(appActions.removeNotice(notice))
    }

    return (
        <div>
            {notices.map((notice, ix) => (
                <Snackbar
                    key={notice.key}
                    open
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    color={notice.type ?? Notice.TYPE_INFO}
                    variant="soft"
                    onClose={handleRemove(notice)}
                    sx={{
                        bottom: `${ix * 60 + 20}px`,
                    }}
                >
                    <Alert color={notice.type} startDecorator={ICONS[notice.type]} variant="soft">
                        <Box>
                            <Typography level="h4">
                                {notice.title}
                            </Typography>
                            {notice.details !== '' && (
                                <Typography level="body-md" variant="plain" color={notice.type ?? Notice.TYPE_INFO}>
                                    {notice.details}
                                </Typography>
                            )}
                        </Box>
                    </Alert>
                </Snackbar>
            ))}
        </div>
    );
};

export default Notices;
