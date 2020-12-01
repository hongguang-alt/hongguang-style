import React from 'react';
import {Button} from './components/Button/button'
import {Alert} from './components/Alert/alert'
import {Menu} from './components/Menu/menu'
import {MenuItem} from './components/Menu/menuItem'
import {SubMenu} from './components/Menu/subMenu';
import {Tabs} from './components/Tabs/tabs'
import {TabItem} from './components/Tabs/tabItem'
import {Icon} from './components/Icon/icon'


function App() {
  return (
    <div className="App">
      <p>图标 Icon</p>
      <Icon
        icon="check"
        size="3x"
        theme='info'
      />
      <Icon
        icon="times"
        size="3x"
        theme='primary'
      />
      <Icon
        icon="anchor"
        size="3x"
      />
      <Icon
        icon="trash"
        size="3x"
      />
      <p>按钮 Button</p>
      <Button size={'lg'}  disabled>Default</Button>
      <Button btnType={'primary'} size={'lg'}>Primary</Button>
      <Button btnType={'danger'}  size={'sm'}>Danger</Button>
      <Button btnType={'link'}  href="https://reactjs.org">Link</Button>
      <p>提示 alert</p>
      <div style={{width:"500px",padding:'5px'}}>
        <Alert title='this is a title' alType='danger' closable={false} description={'this is a description'}/>
      </div>
      <div style={{width:"500px",padding:'5px'}}>
        <Alert 
          title='this is a title' 
          onClose={()=>{
            console.log(111)
          }} 
          description={'this is a description'}
        />
      </div>
      <div style={{width:"500px",padding:'5px'}}>
          <Alert 
          title='this is a title' 
          alType='success'
          onClose={()=>{
            console.log(111)
          }} 
        />
      </div>
      <p>菜单 Menu</p>
      <Menu 
        defaultIndex={'0'} 
        defaultOpenSub={['3']}
        // mode='vertical'
        onSelect={(index)=>{
          console.log(index)
        }}>
        <MenuItem  >
          first
        </MenuItem>
        <MenuItem  disabled>
          second
        </MenuItem>
        <MenuItem >
          three
        </MenuItem>
        <SubMenu title='hongguangwang'>
          <MenuItem >
            0
          </MenuItem>
          <MenuItem >
            1
          </MenuItem>
          <MenuItem >
            2
          </MenuItem>
        </SubMenu>
      </Menu>
      <p>选项卡 Tabs</p>
      <Tabs 
        type={'card'}
        onSelect={(index)=>{
            console.log(index)
        }}
        defaultIndex={0}
      >
        <TabItem label='card1' >this is card1</TabItem>
        <TabItem label='card2' >this is card2</TabItem>
        <TabItem label={'card3'} >this is content disabled</TabItem>
        <TabItem label='disabled' disabled >this is content disabled</TabItem>
      </Tabs>
    </div>
  );
}

export default App;
