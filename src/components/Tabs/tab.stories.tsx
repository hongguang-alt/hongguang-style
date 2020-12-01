import React from 'react'
import { Story,Meta } from '@storybook/react/types-6-0'
import { Tabs ,TabsProps} from './tabs';
import { TabItem  } from './tabItem'


export default {
    title: 'hongguang/Tabs',
    component: Tabs,
    subcomponents:{TabItem}
  } as Meta;

  const Template: Story<TabsProps> = (args) => <Tabs {...args}>
        <TabItem label='card1' >this is card1</TabItem>
        <TabItem label='card2' >this is card2</TabItem>
        <TabItem label={'card3'} >this is content disabled</TabItem>
        <TabItem label='disabled' disabled >this is content disabled</TabItem>
  </Tabs>;

  export const Card = Template.bind({});
  Card.args = {};

  export const Line = Template.bind({});
  Line.args = {
      type:'line'
  };