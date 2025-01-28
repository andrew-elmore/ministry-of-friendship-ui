import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import Accordion, { accordionClasses } from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionGroup from '@mui/joy/AccordionGroup';
import AccordionSummary from '@mui/joy/AccordionSummary';
import Box from '@mui/joy/Box';

import Typography from './Typography';

const addZeroWidthSpacesToTitle = (title) => {
    return title.replace(/([^a-z]+)/ig, '\u200B' + '$1' + '\u200B');
}

const AccordionItem = ({ title, content }) => {
    const theme = useTheme();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Accordion
            onChange={() => setIsOpen(!isOpen)}
            sx={{
                border: '2px solid #000',
                borderRadius: '2rem',
                overflow: 'hidden',
            }}
        >
            <AccordionSummary
                indicator={
                    isOpen ? (
                        <RemoveCircleIcon
                            sx={{
                                fontSize: 50,
                                color: theme.palette.primary[800],
                            }}
                        />
                    ) : (
                        <AddCircleIcon
                            sx={{
                                fontSize: 50,
                                color: theme.palette.primary[800],
                            }}
                        />
                    )
                }
            >
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: {
                            xs: '2rem',
                            md: '2rem',
                        },
                        wordBreak: 'break-word'
                    }}
                >
                    <Box p={2}>{addZeroWidthSpacesToTitle(title)}</Box>
                </Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={{ borderTop: isOpen ? '2px solid #000' : undefined }}
            >
                <Box p={2}>{content}</Box>
            </AccordionDetails>
        </Accordion>
    );
};

export const AccordionList = ({ children }) => {
    return (
        <AccordionGroup
            sx={{
                [`& .${accordionClasses.root}:not(:first-of-type)`]: {
                    marginTop: '1em',
                },
            }}
        >
            {children}
        </AccordionGroup>
    );
};

AccordionItem.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.oneOf([PropTypes.string, PropTypes.node]).isRequired,
};

AccordionList.propTypes = {
    children: PropTypes.node,
};

export default AccordionItem;
