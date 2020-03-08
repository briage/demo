
export interface Menu {
    key: string,
    text: string,
    icon?: string,
    link?: string,
    subMenus?: Array<subMenu>,
    auth: 2 | 3
}
export interface subMenu {
    key: string,
    text: string,
    link: string,
    auth: 2 | 3
}

const MENU_LIST: Array<Menu> = [
    {
        key: 'index',
        text: '首页',
        link: '/',
        icon: 'bar',
        auth: 2
    }, {
        key: 'course',
        text: '课程管理',
        link: '/course',
        icon: 'bar',
        auth: 3
    }, {
        key: 'node-manager',
        text: '课时管理',
        link: '/node-manager',
        icon: 'bar',
        auth: 3
    }, {
        key: 'test-paper',
        text: '试卷管理',
        link: '/test-paper',
        icon: 'bar',
        auth: 2
    }, {
        key: 'test-manager',
        text: '题库管理',
        link: '/test-manager',
        icon: 'bar',
        auth: 2
    }
];

export { MENU_LIST };