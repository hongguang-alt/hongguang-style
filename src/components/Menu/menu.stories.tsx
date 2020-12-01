import React from 'react'
import { Story,Meta } from '@storybook/react/types-6-0'
import { Menu,MenuProps } from './menu';
import { MenuItem  } from './menuItem'
import { SubMenu } from './subMenu'


export default {
    title: 'hongguang/Menu',
    component: Menu,
    subcomponents:{SubMenu,MenuItem}
  } as Meta;

  const Template: Story<MenuProps> = (args) => <Menu {...args}>
      <MenuItem  >
          first
        </MenuItem>
        <MenuItem  disabled>
          second
        </MenuItem>
        <MenuItem >
          three
        </MenuItem>
        <SubMenu title='hongguangwang'>
          <MenuItem >
            第一
          </MenuItem>
          <MenuItem >
            第二
          </MenuItem>
          <MenuItem >
            第三
          </MenuItem>
        </SubMenu>
  </Menu>;

  export const Horizontal = Template.bind({});
  Horizontal.args = {};

  export const Vertical = Template.bind({});
  Vertical.args = {
      mode:'vertical'
  };