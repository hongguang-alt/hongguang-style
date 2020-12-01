import React from 'react'
import { Story,Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { Button,ButtonProps } from './button';

export default {
    title: 'hongguang/Button',
    component: Button
  } as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} onClick={action('clicked')}>Button</Button>;


export const Default = Template.bind({});
Default.args = {};

export const Primary = Template.bind({});
Primary.args = {
    size: 'lg',
    btnType:'primary'
};

export const Danger = Template.bind({});
Danger.args = {
  size:"sm",
  btnType: 'danger',
};

export const Link = Template.bind({});
Link.args = {
    btnType: 'link',
    size:'sm',
    href:'https://www.baidu.com'
};