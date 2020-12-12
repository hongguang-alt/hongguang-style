import React ,{useState,useRef} from 'react'
import classNames from 'classnames'
import { Input, InputProps } from '../Input/input'
import { Icon } from '../Icon/icon'
import useClickOutSide from '../../hooks/useClickOutSide'
import { OptionProps } from './option'

export interface SelectProps extends Omit<InputProps,'onSelect'>{
    /** 组件是否可用 */
    disabled?:boolean
    /** 是否支持多选 */
    multiple?:boolean
    /** 选中后的回调 */
    onSelect?:(value:string)=>void,
    /** 默认值 */
    defaultValue?:string
}

export interface SelectContextProps {
    valueArr:string[],
    multiple?:boolean,
    onClick?:Function
}

export  const  SelectContext =  React.createContext<SelectContextProps>({valueArr:[]})
/**
   #### Select 选择器使用方式
    ~~~ js
    import { Select } from 'hongguang-style'
    ~~~
*/
export const Select:React.FC<SelectProps> = (props)=>{
    const { disabled ,children ,defaultValue,onSelect ,multiple,...restProps} = props
    //当前选中的值,使用数组
    // const [value,setValue] = useState(defaultValue || '')
    const [valueArr,setValueArr] = useState(defaultValue ? [defaultValue] : [])
    const [showContent,setShowContent] = useState(false)
    const componentRef = useRef<HTMLDivElement>(null)
    useClickOutSide(componentRef,()=>{setShowContent(false)})
    const classes = classNames('select',{
        'select-disabled':disabled,
        'select-focus':showContent
    })

    //设置每次选择
    const handleSelect = (value)=>{
        // setValue(value)
        if(multiple){
            let res =  valueArr.includes(value)
            //包含这个属性
            if(res){
                let index = valueArr.indexOf(value)
                let newArr = [...valueArr]
                newArr.splice(index,1)
                setValueArr(newArr)
            }else{
                setValueArr([...valueArr,value])
            }
        }else{
            setValueArr([value])
            setShowContent(!showContent)
        }
        if(onSelect){
            onSelect(value as string)
        }
    }

    const myProps = {
        onClick:handleSelect,
        valueArr,
        multiple
    }

    //点击设置是否显示
    const handleClick = ()=>{
        setShowContent(!showContent)
    }

    const deleteValueArr = (value:string)=>{
        let index = valueArr.indexOf(value)
        let newArr = [...valueArr]
        newArr.splice(index,1)
        setValueArr(newArr)
    }

    const renderChildren = ()=>{
        return React.Children.map(children,(child,index)=>{
            const childElement = child as React.FunctionComponentElement<OptionProps>
            const { props } = childElement
            const { displayName } = childElement.type
            if(displayName==='Option'){
                return React.cloneElement(childElement,{
                    value:props.value
                })
            }else{
                console.error('Warning:Select has child which is not option')
            }
        })
    }

    return <div className={classes} ref={componentRef}>
        <div onClick={handleClick} style={{position:'relative'}}>
            { multiple ? <ul className='select-multiple'>{valueArr.map((item,index)=>{
                return <li className='multiple-item' key={item + index}>
                    <span style={{margin:'0 2px'}}>{item}</span>
                    <Icon icon='times-circle' onClick={(e)=>{
                        e.stopPropagation()
                        deleteValueArr(item)
                    }}/>
                </li>
            })}</ul> : null}
            <Input {...restProps} disabled  value={multiple ? '' : valueArr[0]} icon={showContent ?'angle-up':'angle-down' } />
        </div>
        {
            showContent ?
            <ul className='select-content' >
                <SelectContext.Provider value={myProps}>
                {/* {children} */}
                {renderChildren()}
                </SelectContext.Provider>
            </ul> :
            null
        }
    </div>
} 

Select.defaultProps={
    disabled:false,
    multiple:false
}