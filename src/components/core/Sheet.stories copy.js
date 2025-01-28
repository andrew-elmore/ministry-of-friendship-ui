import React from 'react';
import Sheet, { colorsOptions, variantOptions, capOptions, gradientOptions } from './Sheet';
import {Box} from "@mui/joy";

export default {
    title: 'Core/Sheet',
    component: Sheet,
    argTypes: {
        color: {
            control: 'select',
            options: colorsOptions,
        },
        variant: {
            control: 'select',
            options: variantOptions,
        },
        cap: {
            control: 'select',
            options: capOptions,
        },
        gradient: {
            control: 'select',
            options: gradientOptions,
        },
    },
};

const Template = (args) => <Sheet {...args}>
    <Box my={0} height={300} />
</Sheet>;

const createSheetStory = (color) => {
    const story = Template.bind({});
    story.args = {
        color: color,
        variant: 'solid',
    };
    return story;
};

export const Primary = createSheetStory('primary');
export const Secondary = createSheetStory('secondary');
export const Success = createSheetStory('success');
export const Danger = createSheetStory('danger');
export const Warning = createSheetStory('warning');
export const Neutral = createSheetStory('neutral');
