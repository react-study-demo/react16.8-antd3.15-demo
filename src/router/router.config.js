export default {
  menus: [ // 菜单相关路由
    { key: '/home', title: '首页', icon: 'mobile', component: 'Dashboard' },
    {
      key: '/home/ui', title: '人员管理', icon: 'scan',
      subs: [
        /* { key: '/home/buttons', title: '人员列表', component: 'Buttons' },
        { key: '/home/icons', title: '添加人员', component: 'Icons' }, */
        { key: '/home/AllPeopleList', title: '员工列表', component: 'AllPeopleList' },
        { key: '/home/EditPeople', title: '添加员工', component: 'EditPeople' },
      ]
    }
  ]
};
