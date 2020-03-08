import * as React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { MENU_LIST } from '../../config/menu';

const { SubMenu, Item } = Menu;

function MenuList(props) {
    const userType = props.userInfo.type;
    return (
        <Menu
            mode="inline"
            className='menu-list'
        >
            {
                MENU_LIST.map(menu => (
                    menu.auth <= userType ?
                        menu.subMenus ? (
                            <SubMenu key={menu.key} title={
                                <span>
                                    { menu.icon && <Icon type={menu.icon} /> }
                                    { menu.text }
                                </span>
                            }>
                                {
                                    menu.subMenus.map(
                                        subMenu => (
                                            subMenu.auth <= userType ?
                                                <Item key={subMenu.key}>
                                                    <Link to={subMenu.link}>{ subMenu.text }</Link>
                                                </Item> 
                                            : ''
                                        )
                                    )
                                }
                            </SubMenu>
                        ) : (
                            <Item key={menu.key} >
                                { menu.link ? (
                                    <Link to={menu.link}>{ menu.text }</Link>
                                ) : menu.text }
                            </Item>
                        ) : ''
                    
                ))
            }
        </Menu>
    )
}

export { MenuList };