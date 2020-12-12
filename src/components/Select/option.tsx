import React,{useContext} from 'react'
import classNames from 'classnames'
import { SelectContext,SelectContextProps } from './select'
import { Icon } from '../Icon/icon'

export interface OptionProps {
    disabled?:boolean,
    value:string
}

export const Option:React.FC<OptionProps> = (props)=>{
    const { disabled ,value} = props
    const { valueArr:myValueArr,onClick,multiple } = useContext<SelectContextProps>(SelectContext)
    const classes = classNames('select-option',{
        [`option-disabled`]:disabled
    })
    const handleClick = ()=>{
        if(onClick){
            onClick(value)
        }
    }
    return <li className={classes}
        onClick={ handleClick }
    >
        {value}
        {myValueArr.includes(value) && multiple ? <Icon icon='check'/> : null}
    </li>
}

Option.displayName = "Option"
