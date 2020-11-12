import  React,{useContext} from 'react'
import classNames from 'classnames'
import { MenuContext} from './menu'

export interface MenuItemProps {
    index?:string,
    disabled?:boolean,
    className?:string,
    style?:React.CSSProperties
}

const MenuItem:React.FC<MenuItemProps> = (props)=>{
    const { children,className ,style,disabled,index} = props
    //获取传递过来的函数和index
    const myProps = useContext(MenuContext)
    const classes = classNames('menu-item',className,{
        'it-disabled':disabled,
        'it-active':index === myProps.index && !disabled
    })

    const handleCilck = ()=>{
        if(myProps.onSelect && !disabled && index!==undefined){
            myProps.onSelect(index)
        }
    }

    return (
        <li style={style} className={classes} onClick={handleCilck}>
            {children}
        </li>
    )
} 

MenuItem.defaultProps = {
    disabled:false
}

MenuItem.displayName = "MenuItem"
export default MenuItem