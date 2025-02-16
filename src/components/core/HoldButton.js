import React, { useState, useRef } from 'react';
import { useTheme } from '@mui/joy';
import PropTypes from 'prop-types';
import { Button as JoyButton } from '@mui/joy';

const HoldButton = ({ 
    children, 
    onClick, 
    onHold,
    color = 'primary',
    holdDuration = 2000,
    eventCategory = 'Button', 
    eventAction = 'Click', 
    eventLabel, 
    ...props 
}) => {
    const theme = useTheme();
    const [isHolding, setIsHolding] = useState(false);
    const [holdProgress, setHoldProgress] = useState(0);
    const holdTimer = useRef(null);
    const startTime = useRef(null);
    const animationFrame = useRef(null);

    const updateHoldProgress = () => {
        const progress = Math.min((Date.now() - startTime.current) / holdDuration, 1);
        setHoldProgress(progress);
        
        if (progress < 1) {
            animationFrame.current = requestAnimationFrame(updateHoldProgress);
        }
    };

    const handleMouseDown = () => {
        setIsHolding(true);
        startTime.current = Date.now();
        
        holdTimer.current = setTimeout(() => {
            if (onHold) {
                onHold();
            }
            setIsHolding(false);
            setHoldProgress(0);
        }, holdDuration);

        animationFrame.current = requestAnimationFrame(updateHoldProgress);
    };

    const handleMouseUp = (e) => {
        if (isHolding) {
            clearTimeout(holdTimer.current);
            cancelAnimationFrame(animationFrame.current);
            setIsHolding(false);
            setHoldProgress(0);

            if (Date.now() - startTime.current < holdDuration && onClick) {
                onClick(e);
            }
        }
    };

    const handleMouseLeave = () => {
        if (isHolding) {
            clearTimeout(holdTimer.current);
            cancelAnimationFrame(animationFrame.current);
            setIsHolding(false);
            setHoldProgress(0);
        }
    };

    const colorPalette = theme.palette[color] || {};
    
    return (
        <JoyButton
            {...props}
            color={color}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            sx={{
                ...props.sx,
                position: 'relative',
                overflow: 'hidden',
                WebkitUserSelect: 'none',
                userSelect: 'none',
                WebkitTouchCallout: 'none',
                '&:active': {
                    backgroundColor: colorPalette[100],
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${holdProgress * 100}%`,
                    backgroundColor: colorPalette[500],
                    transition: 'none',
                    zIndex: 0,
                }
            }}
        >
            <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
        </JoyButton>
    );
};

HoldButton.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    onHold: PropTypes.func,
    holdDuration: PropTypes.number,
    eventCategory: PropTypes.string,
    eventAction: PropTypes.string,
    eventLabel: PropTypes.string,
};

export default HoldButton;