import React from 'react';
import {Typography} from "@mui/joy";
import ProcessingOverlay from './ProcessingOverlay';

export default {
    title: 'Core/ProcessingOverlay',
    component: ProcessingOverlay,
    argTypes: {
        enabled: {
            control: 'boolean',
        },
        caption: {
            control: 'text',
        }
    },
};

const Template = (args) => (<>
    <ProcessingOverlay {...args} />
    <Typography level={'body-md'} color="primary" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
    </Typography>
    <Typography level={'body-md'} color="primary" sx={{pt: 4}}>
        Laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
    </Typography>
</>);

const createProcessingOverlayStory = () => {
    const story = Template.bind({});
    story.args = { enabled: true, caption: "Processing..." };
    return story;
};

export const Default = createProcessingOverlayStory();
