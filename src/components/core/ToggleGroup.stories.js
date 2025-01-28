import React from 'react';
import ToggleGroup from 'components/core/ToggleGroup';

export default {
    title: 'Core/ToggleGroup',
    component: ToggleGroup,
    argTypes: {
        label: {
            control: 'text',
        },
        options: {
            control: 'array',
        },
        labels: {
            control: 'array',
        },
        value: {
            control: 'text',
        },
        disabled: {
            control: 'boolean',
        },
        required: {
            control: 'boolean',
        },
        error: {
            control: 'text',
        },
    },
};

const Template = (args) => <ToggleGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'Example Toggles',
    options: ['A', 'B', 'C'],
    labels: {A: 'Options A', B: 'Options B', C: 'Options C'},
    disabled: false,
    error: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Example Input',
    ...Default.args,
    disabled: true,
};

export const ErrorState = Template.bind({});
ErrorState.args = {
    label: 'Example Input',
    ...Default.args,
    error: 'Some error message',
};
