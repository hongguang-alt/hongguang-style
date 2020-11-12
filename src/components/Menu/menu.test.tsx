import React from 'react'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'

import Menu,{MenuProps} from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

//准备测试数据
const testProps:MenuProps ={
    defaultIndex:'0',
    onSelect:jest.fn(),
    className:'test'
}


//测试横向的数据
const testVerProps:MenuProps ={
    defaultIndex:'0',
    onSelect:jest.fn(),
    mode:'vertical'
}

//测试默认展开
const disMenuProps:MenuProps  = {
    defaultIndex:'0',
    defaultOpenSub:['3'],
    mode:'vertical'
}

const NiceMenu = (props:MenuProps)=>{
    return (
        <Menu {...props}>
        <MenuItem  >
          active
        </MenuItem>
        <MenuItem disabled>
          disabled
        </MenuItem>
        <MenuItem >
          three
        </MenuItem>
        <SubMenu title='hongguang'>
            <MenuItem >
                three-one
            </MenuItem>
        </SubMenu>
      </Menu>
    )
}

const createStyleFile = () => {
    const cssFile: string = `
      .submenu {
        display: none;
      }
      .submenu.it-open {
        display:block;
      }
    `
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssFile
    return style
  }

let wrapper:RenderResult,menuElement:HTMLElement,activeElement:HTMLElement,disabledElement:HTMLElement
describe('test Menu and MenuItem component',()=>{
    beforeEach(()=>{
        wrapper = render(NiceMenu(testProps))
        wrapper.container.append(createStyleFile())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })
    it('should render correct Menu and MenuItem based on default props',()=>{
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('menu test')
        expect(menuElement.querySelectorAll(":scope >li").length).toEqual(4)
        expect(activeElement).toHaveClass('it-active menu-item')
        expect(disabledElement).toHaveClass('it-disabled menu-item')
    })
    it('click items should change active and call the right callback',()=>{
        const thirdItem = wrapper.getByText('three')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('it-active')
        expect(activeElement).not.toHaveClass('it-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('it-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })
    it('should render vertical mode when mode is set to vertical',()=>{
        //重新清除wrapper
        cleanup()
        const wrapper = render(NiceMenu(testVerProps))
        const vertMenu = wrapper.getByTestId('test-menu')
        expect(vertMenu).toBeInTheDocument()
        expect(vertMenu).toHaveClass('menu-vertical')
    })
    //测试MenuItem
    it("should show dropdown items when hover on subMenu",async ()=>{
        expect(wrapper.queryByText('three-one')).not.toBeVisible()
        const dropdownElement = wrapper.getByText('hongguang')
        fireEvent.mouseEnter(dropdownElement)
        await waitFor(()=>{
            expect(wrapper.queryByText('three-one')).toBeVisible()
        })
        fireEvent.click(wrapper.getByText('three-one'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(dropdownElement)
        await waitFor(()=>{
            expect(wrapper.queryByText('three-one')).not.toBeVisible()
        })
    })
    //测试横向点击，测试默认展开
    it('should render vertical mode when mode is set to  vertical about SubMenu',async ()=>{
        cleanup()
        const wrapper = render(NiceMenu(testVerProps))
        wrapper.container.append(createStyleFile())
        expect(wrapper.queryByText('three-one')).not.toBeVisible()
        const dropdownElement = wrapper.getByText('hongguang')
        fireEvent.click(dropdownElement)
        await waitFor(()=>{
            expect(wrapper.queryByText('three-one')).toBeVisible()
        })
        fireEvent.click(wrapper.getByText('three-one'))
        expect(testVerProps.onSelect).toHaveBeenCalledWith('3-0')
    })
    //测试默认展开
    it('should render SubMenu which is default open',()=>{
        cleanup()
        const wrapper = render(NiceMenu(disMenuProps))
        wrapper.container.append(createStyleFile())
        expect(wrapper.queryByText('three-one')).toBeVisible()
    })
})