import React,{ ChangeEvent, ReactElement, useState,useEffect ,KeyboardEvent,useRef} from 'react'
import { Input,InputProps } from '../Input/input'
import { Icon  } from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutSide from '../../hooks/useClickOutSide'
import classNames from 'classnames'

interface RenderData {
    value: string;
}

export type RenderDataSource <T = {}> =  T & RenderData


export interface AutoCompleteProps extends Omit<InputProps,'onSelect'>{
    /** 筛选方法 */
    fetchSuggestions:(query:string)=> RenderDataSource[] | Promise<RenderDataSource[]>
    /** 选中后的回调 */
    onSelect?:(item:RenderDataSource)=> void
    /** 自定义渲染样式 */
    renderOption?:(obj:RenderDataSource)=> ReactElement
}

/**
   #### autoComplete自动填充使用方式
    ~~~ js
    import { AutoComplete } from 'hongguang-style'
    ~~~
*/
export const AutoComplete:React.FC<AutoCompleteProps> =(props)=>{
    const { fetchSuggestions,onSelect,value ,className, renderOption,...restProps} = props
    const [suggestions,setSuggestions] = useState<RenderDataSource[]>([])
    const [selectValue,setSelectValue] = useState(value as string)
    const [loading,setLoading] = useState(false)
    const [heightIndex,setheightIndex] = useState(-1)
    const requestRef = useRef(true)
    const componentRef = useRef<HTMLDivElement>(null)
    useClickOutSide(componentRef,()=>{ setSuggestions([]) })
    const debounceValue = useDebounce(selectValue)
    const classes = classNames('auto-complete',classNames)
    
    //value变化，会导致debounceValue的变化，useDebounce这个函数内部延迟了debounceValue的变化
    useEffect(()=>{
        if(debounceValue && requestRef.current){
            //发送请求
            let result  = fetchSuggestions(debounceValue)
            setLoading(true)
            if(result instanceof Promise){
                result.then((data)=>{
                    setSuggestions(data)
                    setLoading(false) 
                })
            }else{
                setSuggestions(result) 
                setLoading(false) 
            }
        }
        setheightIndex(-1)
    // eslint-disable-next-line
    },[debounceValue])

    const renderItem = (value:RenderDataSource)=>{
       return renderOption ? renderOption(value) : value.value
    }

    const handelSelect = (item:RenderDataSource) =>{
        setSelectValue(item.value)
        setSuggestions([])
        if(onSelect){
            onSelect(item)
        }
        requestRef.current = false
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        let value = e.target.value
        setSelectValue(value)
        setSuggestions([])
        requestRef.current = true
    }
    
    const handleKey = (e:KeyboardEvent<HTMLInputElement>) =>{
        
        switch(e.key){
            case 'ArrowUp':
                if(heightIndex <= 0){
                    setheightIndex(0)
                } else{
                    setheightIndex(heightIndex-1)
                }
                break;
            case 'ArrowDown':
                if(heightIndex >= suggestions.length-1) {
                    setheightIndex(suggestions.length - 1)
                } else{
                    setheightIndex(heightIndex+1)
                }
                break;
            case 'Escape':
                setSuggestions([])
                break;
            case "Enter":
                handelSelect(suggestions[heightIndex])
                break
            default:
                break;
        }
    }
    

    return <div className={classes} ref={componentRef}>
        <Input 
            value={selectValue}
            {...restProps}
            onChange={handleChange}
            onKeyDown={handleKey}
        />
       
            {loading ?   
                    <ul className='auto-complete-content'><Icon icon='spinner' spin/></ul>
                    : 
                    suggestions.length > 0 ?<ul className='auto-complete-content'> {suggestions.map((item,index)=> {
                    const suggestionsSelect = classNames('suggestion-item',{
                        'selected-item':heightIndex === index 
                    })
                    return  <li
                    key={index}
                    onClick={()=> handelSelect(item)}
                    className={suggestionsSelect}
                    >
                        {renderItem(item)}
                </li> 
                })}</ul>
                     : 
                    null}
    </div>
}