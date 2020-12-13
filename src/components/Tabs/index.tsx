import { FC } from 'react'
import { Tabs, TabsProps } from './tabs'
import { TabItem, TabItemProps } from './tabItem'

type transTabsProps = FC<TabsProps> & {
    Item:FC<TabItemProps>
}

const transTabs = Tabs as transTabsProps
transTabs.Item = TabItem

export default transTabs