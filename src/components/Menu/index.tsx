import { FC } from 'react'
import { Menu, MenuProps } from './menu'
import { MenuItem, MenuItemProps } from './menuItem'
import { SubMenu, SubMenuProps } from './subMenu'

type transMenuProps = FC<MenuProps> & {
    Item:FC<MenuItemProps>,
    SubMenu:FC<SubMenuProps>
} 

const transMenu = Menu as transMenuProps

transMenu.Item = MenuItem
transMenu.SubMenu = SubMenu

export default transMenu