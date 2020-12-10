import React from 'react'
import { Story,Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { AutoComplete,AutoCompleteProps,RenderDataSource } from './autoComplete'

export default {
    title:'hongguang/AutoComplete',
    component:AutoComplete
} as Meta

const Template :Story<AutoCompleteProps> =(args) =><AutoComplete onSelect={action('change')} {...args} />


type autoObj = {
    value:string
    name?:string,
  }
type githubObj = {
    value:string,
    url?:string
}

const AutoCompleteDataObj = [
    {
    value:'1',
    name:'红光'
  },
  {
    value:'2',
    name:'红光2'
  },
  {
    value:'4',
    name:'红光4'
  },
  {
    value:'9',
    name:'红光9'
  },
  {
    value:'10',
    name:'红光10'
  },
  {
    value:'11',
    name:'红光11'
  },
  {
    value:'12',
    name:'红光12'
  }
    ]

//自定义模板
const renderOption = (obj:RenderDataSource<autoObj>)=>{
  return <>
     <h2>{obj.name}</h2>
     <h2>{obj.value}</h2>
   </> 
 }

 const renderGithubOption = (obj:RenderDataSource<githubObj>)=>{
    return <>
    <h2>{obj.value}</h2>
    {obj.url}
  </> 
 }

//异步请求
const PromiseFetchSuggestions =(query:string)=>{
return fetch('https://api.github.com/search/users?q='+query)
    .then(response => response.json())
    .then(({ items }) => items && items.splice(0,5).map(item => ({value:item.login,...item})));
}

export const Default = Template.bind({});
Default.args = {
    fetchSuggestions: (value)=>{
        return   AutoCompleteDataObj.filter(item=>{
          return item.value > value
        })
    },
};

export const RenderStyle = Template.bind({})
RenderStyle.args = {
    fetchSuggestions: (value)=>{
        return   AutoCompleteDataObj.filter(item=>{
          return item.value > value
        })
      },
      renderOption
}

export const PromiseRes = Template.bind({})
PromiseRes.args = {
    fetchSuggestions: PromiseFetchSuggestions,
    renderOption:renderGithubOption
}
