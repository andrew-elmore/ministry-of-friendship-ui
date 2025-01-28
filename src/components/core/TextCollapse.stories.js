import React from 'react';
import TextCollapse from './TextCollapse';

export default {
    title: 'core/TextCollapse',
    component: TextCollapse,
    argTypes: {},
};

const Template = (args) => <TextCollapse {...args} />;

export const ShortText = Template.bind({});
ShortText.args = {
    content: "Hello, world.",
};

export const LongText = Template.bind({});
LongText.args = {
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
};


export const LongTextWithMaxLength = Template.bind({});
LongTextWithMaxLength.args = {
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    maxLength: 500
};
