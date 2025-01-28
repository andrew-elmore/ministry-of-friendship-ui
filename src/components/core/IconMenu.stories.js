import React from 'react';
import IconMenu from './IconMenu';
import MenuItem from "./MenuItem";

export default {
    title: 'Core/IconMenu',
    component: IconMenu,
    argTypes: {
        icon: {
            control: 'select',
            options: ['vert', 'horiz'],
        },
        dense: {
            control: 'boolean',
        },
        disabled: {
            control: 'boolean',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'danger', 'neutral', 'success', 'warning'],
        },
        variant: {
            control: 'select',
            options: ['solid', 'outlined', 'soft', 'plain'],
        },
    },
};

const Template = (args) => <IconMenu {...args}><MenuItem>MENU ITEM</MenuItem></IconMenu>;

export const Default = Template.bind({});
Default.args = {};

export const Vertical = Template.bind({});
Vertical.args = {
    icon: 'vert',
};

export const Horizontal = Template.bind({});
Horizontal.args = {
    icon: 'horiz',
};
