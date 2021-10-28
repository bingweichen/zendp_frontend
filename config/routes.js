export default [
  {
    path: '/',
    // component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: '登录',
            path: '/user/login',
            component: './User/login',
          },
          {
            name: '注册',
            path: '/user/register',
            component: './User/register',
          },

          {
            name: '重置密码',
            path: '/user/resetPassword',
            component: './User/resetPassword',
          },
        ],
      },

      // account


      {
        path: '/',
        component: '../layouts/HeaderLayout',
        routes: [

          {
            path: "/",
            name: 'home',
            icon: 'HomeOutlined',
            component: './Home/index'
          },

          // 电影
          {
            path: "/movie",
            name: 'movie',
            icon: 'HomeOutlined',
            component: './movie/index',
          },
          {
            path: "/movie/objects/:objectId",
            name: 'objects',
            component: './object/objectDetailPage',
            hideInMenu: true,
          },

          // 租房中介
          {
            path: "/rentAgent",
            name: 'rentAgent',
            icon: 'HomeOutlined',
            component: './rentAgent/index'
          },
          {
            path: "/rentAgent/objects/:objectId",
            name: 'objects',
            component: './object/objectDetailPage',
            hideInMenu: true,
          },

          // 音乐
          {
            path: "/music",
            name: 'music',
            icon: 'HomeOutlined',
            component: './music/index'
          },
          {
            path: "/music/objects/:objectId",
            name: 'objects',
            component: './object/objectDetailPage',
            hideInMenu: true,
          },

          // 游戏
          {
            path: "/game",
            name: 'game',
            icon: 'HomeOutlined',
            component: './game/index'
          },
          {
            path: "/game/objects/:objectId",
            name: 'objects',
            component: './object/objectDetailPage',
            hideInMenu: true,
          },

          // {
          //   path: "/objects/:objectId",
          //   name: 'objects',
          //   component: './object/objectDetailPage',
          //   hideInMenu: true,
          // },

          {
            // 添加条目
            path: "/addObject",
            name: 'addObject',
            component: './object/addObjectPage',
            hideInMenu: true,
          },

          {
            // 编辑条目
            path: "/editObject",
            name: 'editObject',
            component: './object/editObjectPage',
            hideInMenu: true,
          },

          {
            // 搜索条目
            path: "/searchObject",
            name: 'searchObject',
            component: './searchObjectPage',
            hideInMenu: true,
          },



          {
            name: 'account',
            icon: 'user',
            path: '/account',
            hideInMenu: true,
            routes: [
              {
                name: 'settings',
                icon: 'smile',
                path: '/account/settings',
                component: './AccountSettingPage',
              },
            ],
          },


        ]
      },

    ],
  },
  {
    component: './404',
  },
];
