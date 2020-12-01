import React from 'react'
import { render } from '@testing-library/react'
import Icon,{IconProps} from './icon'

const testProps:IconProps = {
    className:'test',
    theme:'primary',
    icon:"check"
}

describe('test Icon component',()=>{
    it('should render the props Icon',()=>{
        const wrapper = render(<Icon {...testProps} />)
        const element = wrapper.getByTestId('icon')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('icon test icon-primary')
    })
})