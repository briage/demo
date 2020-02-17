import * as React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { find } from 'lodash';
import { MENU_LIST, Menu, subMenu } from '../../config/menu';

const Item = Breadcrumb.Item;

const Breadcrumbs = withRouter((props) => {
    const menuList = flatMenu(MENU_LIST);

    const { location } = props;
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const extraBreadcrumbItems = pathSnippets.map((item, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        const menuKey = pathSnippets.slice(0, index + 1).join('-');
        const menuItem = find(menuList, (item) => item.key === menuKey) || { link: '', text: '' };
        return (
            <Item key={url}>
                {menuItem.link ? <Link to={url}>{menuItem.text}</Link> : menuItem.text}
            </Item>
        );
    });
    const BreadcrumbItems = [
        <Item key="home">
            <Link to="/">Home</Link>
        </Item>
    ].concat(extraBreadcrumbItems);
    return <Breadcrumb>{BreadcrumbItems}</Breadcrumb>;
});

/**
 * @desc 平铺目录结构
 * @param menu 目录
 */
const flatMenu = (menu: (Menu | subMenu)[]) => {
    let newArr: (Menu | subMenu)[] = [];
    for (let i = 0; i < menu.length; i++) {
        if ((menu[i] as Menu).subMenus) {
            newArr.push(menu[i]);
            newArr = newArr.concat(flatMenu((menu[i] as Menu).subMenus));
        } else {
            newArr.push(menu[i]);
        }
    }
    return newArr;
};

export default Breadcrumbs;
