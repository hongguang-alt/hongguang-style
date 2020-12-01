import React from 'react'
import { FontAwesomeIcon ,FontAwesomeIconProps} from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IconProps extends FontAwesomeIconProps {
    theme?:ThemeProps,
}

/**
   #### Icon图标使用方式
    ~~~ js
    import { Icon } from 'hongguang-style'
    ~~~
*/
export const Icon:React.FC<IconProps> = (props)=>{
    const { className,theme,icon,...restprops } = props
    const classes = classNames('icon',className,{
        [`icon-${theme}`]:theme
    })
    return (
        <FontAwesomeIcon data-testid='icon' className={classes} icon={icon}  {...restprops} />
    ) 
}
Icon.defaultProps={
    icon:'check'
}
