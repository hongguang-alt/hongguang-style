import React from 'react'
import classNames from 'classnames'

//联合类型
export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'
interface BaseButtonProps {
    className?:string;
    disabled?:boolean;
    size?:ButtonSize;
    btnType?:ButtonType;
    children:React.ReactNode;
    href?:string
}

//获取a链接和按钮的属性
type NativeButton = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButton = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButton & AnchorButton>

const  Button:React.FC<ButtonProps> =(props)=>{
    const { disabled,className,size,btnType,children,href ,...restProps} = props
    //使用变量作为名称的时候，使用[]
    const classes = classNames('btn',className,{
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]:size,
        //是否把disable这个属性挂载到classname上去，只要当时Link的时候才挂载上去，通过classname来控制
        'disabled':(btnType === 'link') && disabled
    })

    if(btnType === 'link' && href){
        return <a
            className={classes}
            href = {href}
            {...restProps}
        >
            {children}
        </a>
    }else{
        return <button
            className={classes}
            disabled={disabled}
            {...restProps}
        >
            {children}
        </button>
    }
}
Button.defaultProps = {
    disabled:false,
    btnType:'default'
}

export default Button