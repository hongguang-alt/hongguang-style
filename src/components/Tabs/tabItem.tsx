import React,{useContext,useEffect} from 'react'
import classNames from 'classnames'
import  {TabsContext} from './tabs'

export interface  TabItemProps{
    label:string | React.ReactElement,
    disabled?:boolean,
    index?:number
}

//每一次都渲染
const TabItem:React.FC<TabItemProps> = (props) =>{
    const { label,disabled,children ,index} = props
    const myProps = useContext(TabsContext)
    const classes = classNames('tabs-item',classNames,{
        'tabs-item-disabled':disabled,
        'item-active':index === myProps.index && !disabled
    })

    useEffect(() => {
        if(myProps.firstChild && index === myProps.index && !disabled){
            myProps.firstChild(children)
        }
    },[])

    const handleClick = ()=>{
        if(myProps.onSelect && !disabled){
            myProps.onSelect(index!,children)
        }
    }
    return <li 
        className={classes}
        onClick={handleClick}
    >
        {/* <div className='tabs-item-title'>{label}</div> */}
        {label}
    </li>
}

TabItem.displayName = 'TabItem'
export default TabItem