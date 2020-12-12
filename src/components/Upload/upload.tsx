import React,{ ChangeEvent, useRef ,useState} from 'react'
import classNames from 'classnames'
import { Button } from '../Button/button'
import axios from 'axios'
import { UploadList } from './uploadList'

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
}

export const Upload:React.FC<UploadProps> = (props)=>{
    const defaultfilesInfo:FileInfoProps[] = [
        {name:"hongguang.txt",uid:Date.now+'upload',size:2345,precentage:10,status:'ready'},
        {name:"a.txt",uid:Date.now+'upload',size:2345,precentage:10,status:'ready'},
        {name:"b.txt",uid:Date.now+'upload',size:2345,precentage:10,status:'ready'}
    ]
    const classes = classNames('upload')
    const componentRef = useRef<HTMLInputElement>(null)
    const { action,onProgress,onSuccess,onError,onChange,beforeUpload } = props
    const [filesInfo,setFilesInfo] = useState<FileInfoProps[]>(defaultfilesInfo || [])

    //更新列表某个数据
    const updateFileInfo = (file:FileInfoProps,fileProps:Partial<FileInfoProps>)=>{
        setFilesInfo((_file)=>{
            console.log(_file)
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
        files.forEach(item=>{
            let format = new FormData()
            let fileInfo:FileInfoProps = {
                uid:Date.now() + 'upload',
                name:item.name,
                precentage:0,
                size:item.size,
                status:'ready'
            }
            //初始化数据
            setFilesInfo([...filesInfo, fileInfo])
            format.append(item.name,item)
            axios.post(action,format,{
                onUploadProgress: progressEvent => {
                    let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
                    //更新数据
                    updateFileInfo(fileInfo,{ precentage:complete })
                    if(onProgress){
                        onProgress(complete,item)
                    }
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

    return <div className={classes}>
        <Button btnType='primary' onClick={handleClick}>文件上传</Button>
        <input 
            type='file'
            style={{display:"none"}}
            ref={componentRef}
            onChange={handleChange}
        />
        <UploadList 
            filesInfo={filesInfo}
        />
    </div>
}