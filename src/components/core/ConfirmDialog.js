import React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

const ConfirmDialog = ({
    title,
    visible,
    destructive,
    cancelHandler,
    cancelText,
    okHandler,
    okText,
    children,
    maxWidth = 'auto'
}) => (
    <Modal open={visible} onClose={cancelHandler}>
        <ModalDialog variant='outlined' role='alertdialog' sx={{maxWidth}}>
            <DialogTitle>
                {destructive && <WarningRoundedIcon />}
                {title}
            </DialogTitle>
            <Divider />
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button
                    variant='solid'
                    color={destructive ? 'danger' : 'success'}
                    onClick={okHandler}
                >
                    {okText || 'OK'}
                </Button>
                <Button variant='plain' color='neutral' onClick={cancelHandler}>
                    {cancelText || 'Cancel'}
                </Button>
            </DialogActions>
        </ModalDialog>
    </Modal>
);

ConfirmDialog.propTypes = {
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    destructive: PropTypes.bool,
    cancelHandler: PropTypes.func.isRequired,
    cancelText: PropTypes.string,
    okHandler: PropTypes.func.isRequired,
    okText: PropTypes.string,
    children: PropTypes.node,
    maxWidth: PropTypes.string,
};

export default ConfirmDialog;
