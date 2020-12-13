import React from 'react'
import { Story,Meta } from '@storybook/react/types-6-0'
// import { action } from '@storybook/addon-actions'
import { Upload,UploadProps } from './upload'

export default {
    title: 'hongguang/Upload',
    component: Upload
  } as Meta;

const Template: Story<UploadProps> = (args) => <Upload {...args} >Button</Upload>;

const beforeUploadSize = (files:FileList)=>{
    let file = files[0]
    if(file.size /1024 > 2){
        alert('尺寸太大了')
        return false
    }
    let newFile = new Promise<FileList>((resolve,reject)=>{
        // files[0].name = 'hongguang'
        resolve(files)
    })
    return newFile
}

export const Default = Template.bind({});
Default.args = {
    action:'https://jsonplaceholder.typicode.com/posts',
    multiple:true,
    onProgress:(pre)=>{
        // console.log(pre)
    },
    data:{
        a:'123'
    },
    name:'hongguang'
}

export const LimitSize = Template.bind({})

LimitSize.args = {
    action:'https://jsonplaceholder.typicode.com/posts',
    beforeUpload:beforeUploadSize
}

export const Drap = Template.bind({})
Drap.args = {
    action:'https://jsonplaceholder.typicode.com/posts',
    multiple:true,
    drag:true
}