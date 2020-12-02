import React, { ChangeEvent, ReactElement } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Icon } from '../Icon/icon'
type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLElement>,'size'>{
    className?:string,
    /** 设置按钮是否禁用 */
    disabled?:boolean,
    /** 设置input框的大小 */
    size?:InputSize,
    /** 设置前缀内容*/
    prepand?:string | ReactElement,
    /** 设置后缀内容*/
    append?:string | ReactElement,
    /** 右侧设置按钮*/
    icon?:IconProp
    /** 改变内容的回调函数*/
    onChange?:(e:ChangeEvent<HTMLElement>)=>void,
}

/**
   #### Input输入框使用方式
    ~~~ js
    import { Input } from 'hongguang-style'
    ~~~
*/
export const Input:React.FC<InputProps> = (props) => {
    const { className,size,disabled,prepand,append,icon,onChange ,...restProps} = props
    const classes = classNames('input',className,{
        [`input-${size}`]:size,
        [`add-padding`]:icon ? true : false
    })
    return (
        <div className='input-content'>
            {prepand ? <div className='input-pre-app'>{prepand}</div> :null}
            <span className='input-inner'>
                {icon ? <Icon className='input-icon' icon={icon}/> : null}
                <input className={classes} disabled={disabled} {...restProps} onChange={ onChange}/>
            </span>
            {append ? <div className='input-pre-app'>{append}</div> :null}
        </div>
        
    )
}

Input.defaultProps = {
    disabled:false
}