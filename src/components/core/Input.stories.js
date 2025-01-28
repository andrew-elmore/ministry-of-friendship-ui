import React from 'react';
import Input from 'components/core/Input';

export default {
    title: 'Core/Input',
    component: Input,
    argTypes: {
        label: {
            control: 'text',
        },
        placeholder: {
            control: 'text',
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

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'Example Input',
    placeholder: 'Type something...',
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

export const DatetimeInput = Template.bind({});
DatetimeInput.args = {
    ...Default.args,
    label: 'Example Datetime Input',
    type: 'datetime-local',
};

export const DateInput = Template.bind({});
DateInput.args = {
    ...Default.args,
    label: 'Example Date Input',
    type: 'date',
};

export const TimeInput = Template.bind({});
TimeInput.args = {
    ...Default.args,
    label: 'Example Time Input',
    type: 'time',
};
