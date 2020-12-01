import React from 'react'
import { Story,Meta } from '@storybook/react/types-6-0'
import { Alert,AlertProps } from './alert'

export default {
    title:'hongguang/Alert',
    component:Alert
} as Meta

const Template :Story<AlertProps> = (args) => <Alert  {...args}/>

export const Default = Template.bind({})
Default.args = {
    title:"this is a message"
}

export const Success = Template.bind({})
Success.args = {
    alType:'success',
    title:"this is a message"
}

export const Warning = Template.bind({})
Warning.args = {
    alType:'warning',
    title:"this is a message"
}

export const Danger = Template.bind({})
Danger.args = {
    closable:false,
    alType:'danger',
    title:"this is a message"
}