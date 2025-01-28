import React, {forwardRef} from 'react';
import JoyModalDialog from '@mui/joy/ModalDialog';
import PropTypes from "prop-types";

const ModalDialog = forwardRef(({ children, ...props }, ref) => (
    <JoyModalDialog ref={ref} {...props}>
        {children}
    </JoyModalDialog>
));

ModalDialog.propTypes = {
    children: PropTypes.node,
};

ModalDialog.displayName = 'ModalDialog';

export default ModalDialog;
