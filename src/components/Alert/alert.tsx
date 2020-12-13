import React,{useState} from 'react'
import classNames from 'classnames'

//联合类型
export type AlertType = 'default' | 'success' | 'warning' | 'danger'

interface BaseAlertProps {
    className?:string;
    description?:string;
    alType?:AlertType;
    closable?:boolean;
    onClose?:()=>void;
}
type requireProps = {
    title:string
}
//普通的div的属性
type DivAlert = BaseAlertProps & React.BaseHTMLAttributes<HTMLElement>
export type AlertProps = Partial<DivAlert> & requireProps

/**
   #### Alert消息提醒使用方式
    ~~~ js
    import { Alert } from 'hongguang-style'
    ~~~
*/
export const Alert:React.FC<AlertProps> =(props)=>{
    const { 
        description,
        className,
        alType,
        closable,
        onClose,
        title
     } = props

    //初始化
    const [classes,setClasses] = useState(classNames('alert',className,{
        [`alert-${alType}`]:alType
    }))

    const handleClick = () => {
        setClasses('alert-none')
        //表示非空
        if(onClose){
            onClose()
        }
    }
    return <div className={classes} title={title}>
        <div className='alert-flex'>
            <span className={ description ? 'alert-hasDes' : ''  } >{title}</span>
            {closable ? <span className='alert-close' onClick={handleClick}>X</span> :''}
        </div>
        {description}
    </div>
}

Alert.defaultProps = {
    closable:true,
    alType:'default'
}