import React from 'react'
import { Story,Meta } from '@storybook/react/types-6-0'


const styles = {
    code:{
        backgroundColor:'rgba(0,0,0,.2)',
        padding:6,
        margin:5,
        color:'#d63384',
        borderRadius:3
    }
}

const WelcomeYou = ()=>{
    return <div>
        <h2>Welcome</h2>
        <p>这是一个使用React，以及TypeScript书写组件库</p>
        <div>使用方法：</div>
        <div style={styles.code}>
            npm i hongguang-style --save
        </div>
        <div >
            引入样式：
        </div>
        <div style={styles.code}>import 'hongguang-style/build/index.css'</div>
        <div style={{marginTop:50}}>
            详细请见文档哦！！
        </div>
    </div>
}
export default {
    title:'Welcome',
    component:WelcomeYou
} as Meta

const Template :Story = (args) => <WelcomeYou  {...args}/>

export const Welcome = Template.bind({})
Welcome.args = {}

