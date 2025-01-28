import React, {forwardRef} from 'react';
import JoyLinearProgress from '@mui/joy/LinearProgress';
import PropTypes from "prop-types";

const LinearProgress = forwardRef(({ children, ...props }, ref) => (
    <JoyLinearProgress ref={ref} {...props}>
        {children}
    </JoyLinearProgress>
));

LinearProgress.propTypes = {
    children: PropTypes.node,
};

LinearProgress.displayName = 'LinearProgress';

export default LinearProgress;

