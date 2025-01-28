import React from 'react';
import ConfirmDialog from './ConfirmDialog';

export default {
    title: 'Core/ConfirmDialog',
    component: ConfirmDialog,
};

const Template = (args) => <ConfirmDialog {...args}></ConfirmDialog>;

export const Primary = Template.bind({});
Primary.args = {
    visible: true,
    title: 'Test',
    destructive: false,
    cancelHandler: () => {},
    okHandler: () => {},
    children: [<p key="example">This is example content for a confirm dialog.</p>],
};

export const Destructive = Template.bind({});
Destructive.args = {
    visible: true,
    title: 'Test',
    destructive: true,
    cancelHandler: () => {},
    okHandler: () => {},
    children: [<p key="example">This is example content for a confirm dialog.</p>],
};
