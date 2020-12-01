import React from 'react';
import './button.css';
import classNames from 'classnames'

type ButtonSize = 'lg' | 'sm'
type ButtonType = 'primary' | 'default' | 'danger' | 'link'
interface BaseButtonProps {
  /**
   * Optional click handler
   */
  href?:string
  children:React.ReactNode;
  btnType?:ButtonType;
  className?:string;
  disabled?:boolean;
  size?:ButtonSize;
}

type NativeButton = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButton = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButton & AnchorButton>

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = (props) => {
  const { disabled,className,size,btnType,children,href ,...restProps } = props
  const classes = classNames('btn',className,{
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]:size,
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
};

Button.defaultProps = {
  disabled:false,
  btnType:'default'
}