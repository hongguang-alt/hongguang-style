import React from 'react'
import classNames from 'classnames'
import { FileInfoProps } from './upload'
import { Icon } from '../Icon/icon'
import { Progress } from '../Progress/progress'

export interface UploadListProps {
    filesInfo:FileInfoProps[],
    remove:Function
}

export const UploadList:React.FC<UploadListProps> = (props) =>{
    const { filesInfo ,remove}  = props
    const classes = classNames('upload-list')

    const handleClick = (index:number)=>{
        remove(index)
    }

    return <ul className={classes}>
        { filesInfo.map((item,index)=>{
            const { status } = item
            return <li className={`upload-list-${item.status} upload-list-base`} key={item.uid+item.name}>
                <div className='upload-item'>
                    <Icon icon='file-alt' style={{marginRight:'5px'}}/>
                    <span>{item.name}</span>
                    <span style={{marginLeft:'10px'}} >
                        { status ==='uploading' ? <Icon className='open-list' spin icon='spinner'/> : null}
                        { status ==='success' ? <Icon className='open-list' icon='check'/> : null}
                        { status ==='error' ? <Icon   className='open-list'  icon='times'/> : null}
                        <Icon icon='times-circle' className='close-list' onClick={()=>handleClick(index)} style={{display:'none'}}/>
                    </span>
                </div>
                    {
                        status ==='uploading' && 
                        <Progress 
                            percent={item.precentage}
                        />
                    }
            </li>
        }) }
    </ul>
}