import React from 'react'
import { render ,fireEvent } from '@testing-library/react'
import Alert,{ AlertProps } from './alert'

const defaultProps = {
    title:'this is default',
    onClose: jest.fn()
}

const testProps:AlertProps = {
    alType:'danger',
    title:"this is danger!",
    className:'myclass',
    description:'this is a description!',
    closable:false
}

//分类描述
describe('test Alert component',()=>{
    it('should render the correct default alert',()=>{
        const wrapper = render(<Alert  {...defaultProps}/>)
        const element = wrapper.getByTitle('this is default')
        const elementClose = element.getElementsByClassName('alert-close')[0]
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual("DIV")
        expect(element).toHaveClass('alert alert-default')
        fireEvent.click(elementClose)
        expect(defaultProps.onClose).toHaveBeenCalled()
    })
    it('should render the correct component base on different props',()=>{
        const wrapper = render(<Alert {...testProps}/>)
        const element = wrapper.getByTitle('this is danger!')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('DIV')
        expect(element).toHaveClass('alert alert-danger')
    })
})
