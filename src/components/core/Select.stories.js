import React from 'react';
import Select from 'components/core/Select';
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

export default {
    title: 'Core/Select',
    component: Select,
    argTypes: {
        label: {
            control: 'text',
        },
        options: {
            control: 'array',
        },
        labels: {
            control: 'object',
        },
        icons: {
            control: 'object',
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

const Template = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'Example Select',
    options: ['A', 'B', 'C'],
    labels: {A: 'Options A', B: 'Options B', C: 'Options C'},
    disabled: false,
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
    ...Default.args,
    placeholder: 'Select something....',
};

export const Disabled = Template.bind({});
Disabled.args = {
    ...Default.args,
    disabled: true,
};

export const WithError = Template.bind({});
WithError.args = {
    ...Default.args,
    error: 'Some error message',
};

export const WithIcons = Template.bind({});
WithIcons.args = {
    ...Default.args,
    icons: {
        A: CheckCircleRoundedIcon,
        B: CheckCircleRoundedIcon,
    }
};

export const MultiSelect = Template.bind({});

MultiSelect.args = {
    label: 'Example Select',
    value: ['C'],
    options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    labels: {
        A: 'Engineering',
        B: 'Computer Science',
        C: 'Architecture & Construction',
        D: 'Biotechnology',
        E: 'Robotics',
        F: 'Cybersecurity',
        G: 'Programming',
        H: 'Aerospace',
        I: 'Healthcare'
    },
    multiple: true
};

MultiSelect.decorators = [
    (Story) => (
        <div style={{ width: '250px' }}>
            <Story />
        </div>
    )
];
