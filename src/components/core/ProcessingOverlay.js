import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Stack, CircularProgress, Typography} from '@mui/joy';

function ProcessingOverlay({enabled, caption}) {
    return (
        <Modal open={enabled}>
            <Stack
                alignItems="center"
                pt={6}
                sx={{
                    border: 0,
                    '&:focus-visible': {outline: 'none'}
                }}
            >
                <CircularProgress size="lg" variant="outlined" color="primary" />
                <Typography level="h1" color="primary">{caption}</Typography>
            </Stack>
        </Modal>
    );
}

ProcessingOverlay.propTypes = {
    enabled: PropTypes.bool,
    caption: PropTypes.string,
};

ProcessingOverlay.defaultProps = {
    enabled: false,
    caption: 'Processing...',
};

export default ProcessingOverlay;
