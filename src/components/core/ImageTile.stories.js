import React from 'react';
import ImageTile from './ImageTile';
import {colorsOptions} from "./Sheet";

export default {
    title: 'core/ImageTile',
    component: ImageTile,
    argTypes: {
        src: {
            control: 'string',
        },
        color: {
            control: 'select',
            options: colorsOptions,
        },
        width: {
            control: 'number',
        }
    },
};

const Template = (args) => <ImageTile {...args} />;

export const Missing = Template.bind({});
Missing.args = {
    src: undefined,
    width: 200
};

export const Default200 = Template.bind({});
Default200.args = {
    src: 'https://picsum.photos/200',
    width: 200
};

export const Default400 = Template.bind({});
Default400.args = {
    src: 'https://picsum.photos/400',
    width: 400
};

export const Disabled = Template.bind({});
Disabled.args = {
    src: 'https://picsum.photos/200',
    disabled: true,
};
