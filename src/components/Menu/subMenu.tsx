import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import  {  MenuItemProps } from './menuItem'
import { MenuContext } from './menu'


export interface SubMenuProps {
    index?:string,
    title?:string,
    className?:string
}


const SubMenu:React.FC<SubMenuProps> = (props)=>{
    const { index,title,className ,children} = props
    //使用conetxt获取数据
    const context = useContext(MenuContext)
    const defaultSub = context.defaultOpenSub as Array<string>
    const isOpen = (index && context.mode === 'vertical') ? defaultSub.includes(index)  :false

    //是否点击
    const [open,setOpen] = useState(isOpen)


    const classes = classNames('menu-item submenu-item',className,{
        'it-active':context.index === index
    })

    const handleClick = ()=>{
        setOpen(!open)
    }

    let timer : any
    const handleMouse =(e:React.MouseEvent,toggle:boolean)=> {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(()=>{
            setOpen(toggle)
        },300)
    }
    
    const clickEvent = context.mode === 'vertical' ? {
        onClick:handleClick
    }: {}

    const mouseEvent = context.mode === 'horizontal' ? {
        onMouseEnter:(e:React.MouseEvent)=>handleMouse(e,true),
        onMouseLeave:(e:React.MouseEvent)=>handleMouse(e,false)
    }:{}

    //返回函数
    const readlyChildren = ()=>{
        const disClasses = classNames('submenu',{
            'it-open':open
        })
        const  contentElement =  React.Children.map(children,(child,i)=>{
            const childrenElement = child as React.FunctionComponentElement<MenuItemProps>
            const  { displayName  } = childrenElement.type
            if(displayName==='MenuItem'){
                return React.cloneElement(childrenElement,{
                    index:`${index}-${i}`
                })
            }else{
                console.error('Warning:SubMenu has child which is not MenuItem')
            }
        })

        return (
            <ul className={disClasses} >
                {contentElement}
            </ul>
        )
    }

    return (
        <li className={classes} key={index} {...mouseEvent}>
            <div className='submenu-title' {...clickEvent}>{title}</div>
            {readlyChildren()}
        </li>
    )
}
SubMenu.displayName = 'SubMenu'

export default SubMenu
