import React from 'react'
import classNames from 'classnames'
import {  ThemeProps } from '../Icon/icon'

interface ProgressProps {
    percent:number,
    showText?:boolean,
    theme?:ThemeProps,
    styleHight?:number
}

export  const Progress:React.FC<ProgressProps> =(props)=>{
    const { percent,theme,styleHight ,showText} = props
    const classes = classNames('progress')
    return <div className={classes} style={{height:`${styleHight}px`}}>
        <div className={`progress-content progress-${theme}`} style={{width:`${percent}%`}}>
            { showText && percent}%
        </div>
    </div>
}

Progress.defaultProps = {
    showText:true,
    theme:'primary',
    styleHight:20
}