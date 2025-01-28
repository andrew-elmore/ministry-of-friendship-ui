import React from 'react';
import Button from './Button';

export default {
    title: 'Core/Button',
    component: Button,
    argTypes: {
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'danger', 'info', 'success', 'warning'],
        },
        variant: {
            control: 'select',
            options: ['solid', 'outlined', 'soft', 'plain'],
        },
        disabled: {
            control: 'boolean',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
    },
};

const Template = (args) => <Button {...args}>Button Text</Button>;

export const Primary = Template.bind({});
Primary.args = {
    color: 'primary',
    variant: 'solid',
};

export const Secondary = Template.bind({});
Secondary.args = {
    color: 'secondary',
    variant: 'solid',
};

export const Danger = Template.bind({});
Danger.args = {
    color: 'danger',
    variant: 'solid',
};


export const Warning = Template.bind({});
Warning.args = {
    color: 'warning',
    variant: 'solid',
};

export const Success = Template.bind({});
Success.args = {
    color: 'success',
    variant: 'solid',
};
