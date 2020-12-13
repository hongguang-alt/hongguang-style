 import { FC } from 'react'
import { Select ,SelectProps} from './select'
import { Option, OptionProps } from './option'

type transSlectProps = FC<SelectProps> & {
    Option:FC<OptionProps>,
} 

const transSelect = Select as transSlectProps

transSelect.Option = Option

export default transSelect