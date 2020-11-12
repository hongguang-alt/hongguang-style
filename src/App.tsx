import React from 'react';
import Button from './components/Button/button'
import Alert from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu';
import Tabs from './components/Tabs/tabs'
import TabsItem from './components/Tabs/tabItem'

function App() {
  return (
    <div className="App">
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
        // mode='horizontal'
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
        <TabsItem label='card1' >this is card1</TabsItem>
        <TabsItem label='card2' >this is card2</TabsItem>
        <TabsItem label={'card3'} >this is content disabled</TabsItem>
        <TabsItem label='disabled' disabled >this is content disabled</TabsItem>
      </Tabs>
    </div>
  );
}

export default App;
