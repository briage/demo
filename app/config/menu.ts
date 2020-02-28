
export interface Menu {
    key: string,
    text: string,
    icon?: string,
    link?: string,
    subMenus?: Array<subMenu>
}
export interface subMenu {
    key: string,
    text: string,
    link: string
}

const MENU_LIST: Array<Menu> = [
    {
        key: 'mobx',
        text: 'Mobx',
        icon: 'bars',
        subMenus: [
            {
                key: 'mobx-react',
                text: 'mobx-react',
                link: '/mobx-react'
            }, {
                key: 'mobx-react2',
                text: 'mobx-react2',
                link: '/mobx-react2'
            }
        ]
    }, {
        key: 'rxjs',
        text: 'RxJs',
        icon: 'bar',
        link: '/rxjs'
    }, {
        key: 'activity',
        text: '平台活动',
        icon: 'bars',
        subMenus: [
            {
                key: 'bank-activity',
                text: '银行活动',
                link: '/bank-activity'
            }
        ]
    }
];

export { MENU_LIST };