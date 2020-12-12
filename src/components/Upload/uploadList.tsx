import React from 'react'
import classNames from 'classnames'
import { FileInfoProps } from './upload'

export interface UploadListProps {
    filesInfo:FileInfoProps[]
}

export const UploadList:React.FC<UploadListProps> = (props) =>{
    const { filesInfo }  = props
    const classes = classNames('upload-list')
    return <ul className={classes}>
        { filesInfo.map(item=>{
            return <li className={`upload-list-${item.status}`} key={item.uid+item.name}>
                <span>{item.name}</span>
                <span></span>
            </li>
        }) }
    </ul>
}