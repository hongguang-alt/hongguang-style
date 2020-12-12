import React from 'react'
import { Story,Meta } from '@storybook/react/types-6-0'
import { Select,SelectProps } from './select'
import {Option} from './option'

export default {
    title: 'hongguang/Select',
    component: Select,
    subcomponents:{Option}
  } as Meta;

const Template: Story<SelectProps> = (args) => <Select {...args} >
    <Option value='first' />
    <Option value='second' />
    <Option value='three' disabled/>
    <Option value='four' />
</Select>


export const Default = Template.bind({});
Default.args = {
    defaultValue:'first'
};

//多选
export const Multiple = Template.bind({});
Multiple.args = {
    multiple:true
}

//禁用
export const Disabled = Template.bind({});
Disabled.args={
    disabled:true,
    placeholder:'禁用了'
}