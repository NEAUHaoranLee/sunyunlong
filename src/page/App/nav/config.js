export const navMap = {
    student: [
        {
            path: '/student',
            name: '我的申请',
        },{
            path: '/student/apply',
            name: '在线申请',
        },{
            path: '/student/scoreQuery',
            name: '分数查询',
        },{
            path: '/account-management',
            name: '账号管理',
        }
    ],
    manager: [
        {
            path: '/manager',
            name: '当前流程',
        },
        {
            path: '/manager/view-project',
            name: '流程管理',
        }
    ],
    teacher: [
        {
            path: '/teacher',
            name: '待审批',
        },
        {
            path: '/teacher/view-project',
            name: '我的项目',
        }
    ]
}