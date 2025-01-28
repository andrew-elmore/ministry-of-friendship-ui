import React, {forwardRef} from 'react';
import JoyModal from '@mui/joy/Modal';
import PropTypes from "prop-types";

const Modal = forwardRef(({ children, ...props }, ref) => (
    <JoyModal ref={ref} {...props}>
        {children}
    </JoyModal>
));

Modal.propTypes = {
    children: PropTypes.node,
};

Modal.displayName = 'Modal';

export default Modal;
