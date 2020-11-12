import React,{useState} from 'react'
import classNames from 'classnames'
import {TabItemProps } from './tabItem'
type TabsMode = 'line' | 'card'
type SelectFn = (selectedIndex:number)=>void

export interface TabsProps {
    type?:TabsMode,
    onSelect?:SelectFn,
    className?:string,
    defaultIndex?:number
}

//传递的数据,函数也传过去,点击的时候产生回调函数
export interface TabsContextPropsInter {
    index:number,
    onSelect?:(selectedIndex:number,child:any)=>void
    firstChild?:(child:any)=>void
}


export const TabsContext = React.createContext<TabsContextPropsInter>({index:0})

const Tabs:React.FC<TabsProps> = (props)=>{
    const { className,type ,children,defaultIndex,onSelect} = props

    const [count,setCount] = useState(defaultIndex)
    const [child,setChild] = useState()
    const classes = classNames('tabs',className,{
        [`tabs-${type}`]:true
    })

    //将点击的index传递回来
    const handleSelect = (count:number,child:any)=>{
        setCount(count)
        setChild(child)
        if(onSelect){
            onSelect(count)
        }
    }

    const TabsContentxProps:TabsContextPropsInter ={
        index: count ? count : 0,
        onSelect:handleSelect,
        firstChild:(child)=>{
            setChild(child)
        }
    }
    
    const readlyChild = () =>{
      return React.Children.map(children,(itemChild,index)=>{
          const childElement = itemChild as React.FunctionComponentElement<TabItemProps>
          const { displayName } = childElement.type
          if(displayName === 'TabItem'){
            return React.cloneElement(childElement,{
                index
            })
          }else{
            console.error('Warning:Tabs has child which is not TabItem')
          }
        })
    }

    return (<>
    <ul
        className={classes}
        data-testid='test-tabs'
    >   
    <TabsContext.Provider value={TabsContentxProps}>
        {readlyChild()}
    </TabsContext.Provider>
    </ul>
    <div className='tabs-body'>{child}</div>
    </>)
}

Tabs.defaultProps ={
    defaultIndex:0,
    type:"line"
}

export default Tabs