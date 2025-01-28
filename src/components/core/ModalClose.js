import React, {forwardRef} from 'react';
import JoyModalClose from '@mui/joy/ModalClose';
import PropTypes from "prop-types";

const ModalClose = forwardRef(({ children, ...props }, ref) => (
    <JoyModalClose ref={ref} {...props}>
        {children}
    </JoyModalClose>
));

ModalClose.propTypes = {
    children: PropTypes.node,
};

ModalClose.displayName = 'ModalClose';

export default ModalClose;
