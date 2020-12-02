import React from 'react'
import { Story,Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { Input,InputProps } from './input'

export default {
    title:'hongguang/Input',
    component:Input
} as Meta

const Template:Story<InputProps> = (args) =><Input {...args} onChange={action('change')} />

export const Default = Template.bind({});
Default.args = {
    defaultValue:'defalut input'
};

export const Small = Template.bind({});
Small.args = {
    size: 'sm',
    defaultValue:"small input"
};

export const Large = Template.bind({});
Large.args = {
  size:"lg",
  defaultValue:'large input'
};

export const Disable = Template.bind({});
Disable.args = {
    disabled:true,
    defaultValue:'disable input'

};

export const Prepand = Template.bind({});
Prepand.args = {
    prepand:'http://',
    defaultValue:'prepand input'

};

export const Append = Template.bind({});
Append.args = {
    append:'.com',
    defaultValue:'append input'
};

export const Icon = Template.bind({});
Icon.args = {
    icon:'search',
    defaultValue:'right icon input'
};