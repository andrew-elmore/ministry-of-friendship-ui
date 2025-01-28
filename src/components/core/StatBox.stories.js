import React from 'react';

import StatBox, { StatBoxGroup } from './StatBox';

export default {
    title: 'core/StatBox',
    component: StatBox,
};

const Template = (args) => <StatBox {...args} />;

const TemplateGroup = (args) => (
    <StatBoxGroup>
        <StatBox {...args}></StatBox>
        <StatBox {...args}></StatBox>
        <StatBox {...args}></StatBox>
    </StatBoxGroup>
);

export const Default = Template.bind({});
Default.args = {
    value: 100,
    description: 'Stat',
};

export const GroupedStats = TemplateGroup.bind({});
GroupedStats.args = {
    value: 100,
    description: 'Stat',
};

export const ValueWithPrefix = Template.bind({});
ValueWithPrefix.args = {
    value: '+100',
    description: 'Stat',
};

export const ValueWithSuffix = Template.bind({});
ValueWithSuffix.args = {
    value: '100%',
    description: 'Stat',
};

export const FloatValue = Template.bind({});
FloatValue.args = {
    value: '0.25',
    description: 'Stat',
};
