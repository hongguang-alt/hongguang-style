import React from 'react'
import { cleanup, fireEvent, render ,RenderResult} from '@testing-library/react'
import  Tabs,{ TabsProps }  from './tabs'
import TabsItem from './tabItem'

//测试数据
const testProps:TabsProps ={
    defaultIndex:0,
    className:'test-class',
    onSelect:jest.fn()
}

//测试卡片的样式
const testCardProps:TabsProps = {
    type:'card'
}

//测试组件
const MyTabs = (props:TabsProps)=>{
    return (
        <Tabs 
       {...props}
      >
        <TabsItem label='card1' >card-1</TabsItem>
        <TabsItem label='card2' >card-2</TabsItem>
        <TabsItem label='disabled' disabled >disabled</TabsItem>
      </Tabs>
    )
}

let wrapper:RenderResult,tabsElement:HTMLElement,activeElement:HTMLElement,disabledElement:HTMLElement
describe('test Tabs and TabItem component', () => {
    beforeEach(()=>{
        wrapper = render(MyTabs(testProps))
        tabsElement = wrapper.getByTestId('test-tabs')
        activeElement = wrapper.getByText('card1')
        disabledElement = wrapper.getByText('disabled')
    })
    it('shuld render Tabs and TabItem based on testProps',()=>{
        expect(tabsElement).toBeInTheDocument()
        expect(tabsElement).toHaveClass('tabs test-class')
        expect(tabsElement.querySelectorAll(":scope >li").length).toEqual(3)
        expect(activeElement).toHaveClass('tabs-item item-active')
        expect(disabledElement).toHaveClass('tabs-item tabs-item-disabled')
    })
    it('click items should change active and call the right callback in tabItem',()=>{
        const clickItem = wrapper.getByText('card2') 
        fireEvent.click(clickItem)
        expect(clickItem).toHaveClass('item-active')
        expect(activeElement).not.toHaveClass('item-active')
        expect(testProps.onSelect).toHaveBeenCalledWith(1)
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('item-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith(2)
    })
    it('test tabs which type is card',()=>{
        cleanup()
        const wrapper = render(MyTabs(testCardProps))
        const tabsElement = wrapper.getByTestId('test-tabs')
        expect(tabsElement).toHaveClass('tabs tabs-card')
    })
})
