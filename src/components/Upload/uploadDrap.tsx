import React,{ useState,DragEvent } from 'react'
import { Icon } from '../Icon/icon'
import classNames from 'classnames'

interface UploadDrapProps {
    post:(filesList:FileList)=>void,
}

export const UploadDrap:React.FC<UploadDrapProps>  = (props)=>{
    const { post } = props
    const [drap,setDrop] = useState(false)
    const classes = classNames('upload-drap',{
        'drap':drap
    })

    const handleDragOver = (e:DragEvent,over:boolean)=>{
        e.preventDefault()
        setDrop(over)
    }

    const onFile = (e:DragEvent)=>{
        e.preventDefault()
        let fileList = e.dataTransfer.files
        post(fileList)
        setDrop(false)
    }

    return <div className={classes}
        onDragOver={(e:DragEvent)=>handleDragOver(e,true)}
        onDragLeave={(e:DragEvent)=>handleDragOver(e,false)}
        onDrop={onFile}
    >
        <Icon icon='upload' size='3x'/>
        <span>拖拽上传 </span>
    </div>
}

