import React,{useState} from 'react'
import classNames from 'classnames'
import {MenuItemProps} from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectFn = (selectedIndex:string)=>void

//一些属性
export interface MenuProps {
    defaultIndex?:string,
    className?:string,
    mode?:MenuMode,
    style?:React.CSSProperties,
    onSelect?:SelectFn,
    defaultOpenSub?:string[]
}

interface MenuContextInter {
    index:string,
    onSelect?:SelectFn,
    mode?:MenuMode,
    defaultOpenSub?:string[]
}

export const  MenuContext =  React.createContext<MenuContextInter>({index:'0'})


const Menu:React.FC<MenuProps> = (props) =>{
    const { className ,mode ,children,style,defaultIndex,onSelect,defaultOpenSub} = props
    const [ItemIndex,setItemIndex] = useState(defaultIndex)

    const classes = classNames('menu',className,{
        [`menu-${mode}`]:true,
    })

    const handleSelect = (index:string) =>{
        setItemIndex(index)
        if(onSelect){
            onSelect(index)
        }
    }

    const myProps ={
        index:ItemIndex ? ItemIndex : '0',
        onSelect:handleSelect,
        mode,
        defaultOpenSub
    }

    //渲染孩子节点的类型
    const readlyChildren = ()=>{
       return React.Children.map(children,(child,index)=>{
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if(displayName==='MenuItem' || displayName==='SubMenu'){
                return React.cloneElement(childElement,{
                    index:index.toString()
                })
            }else{
                console.error('Warning:Menu has child which is not MenuItem')
            }
        })
    }

    return (
        <ul className ={classes} style={style} data-testid='test-menu'>
            <MenuContext.Provider value={myProps}>
            {readlyChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex:'0',
    mode:"horizontal",
    defaultOpenSub:[]
}


export default Menu