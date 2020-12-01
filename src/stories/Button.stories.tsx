import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Button as MYButton, ButtonProps } from './Button';

export default {
  title: 'Example/Button',
  component: MYButton,
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as Meta;

const Template: Story<ButtonProps> = (args) => <MYButton {...args} >123</MYButton>;

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