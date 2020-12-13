import React,{ ChangeEvent, useRef ,useState} from 'react'
import classNames from 'classnames'
import { Button } from '../Button/button'
import axios from 'axios'
import { UploadList } from './uploadList'
import { UploadDrap } from './uploadDrap'

export type UploadReady = 'ready' | 'uploading' | 'success' | 'error'
export interface FileInfoProps {
    uid:string,
    name:string,
    size:number,
    precentage:number,
    status: UploadReady
} 

export interface UploadProps  {
    /** 上传地址 */
    action:string,
    /** 上传进程 */
    onProgress?:(percentage:number,file:File)=>void,
    /** 上传成功回调 */
    onSuccess?:(res,file:File)=>void,
    /** 上传失败回调 */
    onError?:(res,file:File)=>void
    /** 数据改变之后的回调 */
    onChange?:(file:File)=>void
    /** 上传前的钩子函数 */
    beforeUpload?:(fileList:FileList)=>boolean | Promise<FileList>
    /** 移出文件后的回调函数 */
    onremove?:(file:FileInfoProps)=>void
    /** 上传的文件名称 */
    name?:string
    /** 修改的头部信息 */
    headers?:{[key:string]:any}
    /** 是否携带cookie*/
    withCredentials?:boolean
    /** 支持的格式 */
    accept?:string
    /** 是否支持多选 */
    multiple?:true
    /** 要上传的数据 */
    data?:{[key:string]:any}
    /** 是否拖拽上传 */
    drag?:boolean
}

/**
 * ### Upload的使用方法
 * ~~~js
 * import { Upload } from 'hongguang-style'
 * ~~~
*/
export const Upload:React.FC<UploadProps> = (props)=>{
    const classes = classNames('upload')
    const componentRef = useRef<HTMLInputElement>(null)
    const {data,drag, action,onProgress,onSuccess,onError,onChange,beforeUpload ,onremove,withCredentials,headers,name,multiple,accept} = props
    const [filesInfo,setFilesInfo] = useState<FileInfoProps[]>([])

    //更新列表某个数据
    const updateFileInfo = (file:FileInfoProps,fileProps:Partial<FileInfoProps>)=>{
        setFilesInfo((_file)=>{
           return _file.map(item=>{
                if(item.uid === file.uid){
                    return { ...item,...fileProps }
                }else{
                    return item
                }
            })
        })
    }

    const handleClick = () =>{
        if(componentRef.current){
            componentRef.current.click()
        }
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        let fileList = e.target.files
        if(!fileList){
            return
        }
        uploadFiles(fileList)
    }

    const uploadFiles = (fileList:FileList)=>{
        if(!beforeUpload){
            post(fileList)
            return
        }
        //把所有文件交给beforeUpload处理
        let res = beforeUpload(fileList)
        if(res && res instanceof Promise){
            res.then(data=>{
                post(data)
            })
        }else if(res){
            post(fileList)
        }
    }

    const post = (fileList:FileList)=>{
        let files = Array.from(fileList)
        if(!multiple) files = [files[0]]
        files.forEach(item=>{
            let format = new FormData()
            let fileInfo:FileInfoProps = {
                uid:Date.now() + 'upload',
                name:item.name,
                precentage:0,
                size:item.size,
                status:'ready'
            }
            //初始化数据,防止异步
            setFilesInfo((filesInfo)=>{
                return [...filesInfo, fileInfo]
            })
            format.append(name || 'file',item)
            if(data){
                Object.keys(data).forEach(it=>{
                    format.append(it,data[it])
                })
            }
            axios.post(action,format,{
                onUploadProgress: progressEvent => {
                    let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
                    //更新数据
                    updateFileInfo(fileInfo,{ precentage:complete,status:'uploading' })
                    if(onProgress){
                        onProgress(complete,item)
                    }
                  },
                  withCredentials,
                  headers:{
                      ...headers,
                  }
            })
                .then(res=>{
                    if(onSuccess){
                        updateFileInfo(fileInfo,{ status:'success' })
                        onSuccess(res,item)
                    }
                    if(onChange){
                        onChange(item)
                    }
                })
                .catch(res=>{
                    if(onError){
                        updateFileInfo(fileInfo,{ status:'error' })
                        onError(res,item)
                    }
                    if(onChange){
                        onChange(item)
                    }
                })
        })

    }


    const onmove = (index:number)=>{
        if(onremove){
            onremove(filesInfo[index])
        }
        let newFiles = [...filesInfo]
        newFiles.splice(index,1)
        setFilesInfo(newFiles)
    }


    return <div className={classes}>
        { drag ? 
        <div onClick={handleClick}> 
            <UploadDrap 
                post={post}
            />
        </div> 
        : 
            <Button btnType='primary' onClick={handleClick}>文件上传</Button>
        }
        <input 
            type='file'
            style={{display:"none"}}
            ref={componentRef}
            onChange={handleChange}
            multiple={multiple}
            accept={accept}
        />
        <UploadList 
            filesInfo={filesInfo}
            remove={onmove}
        />
    </div>
}

Upload.defaultProps={
    withCredentials:false,
}