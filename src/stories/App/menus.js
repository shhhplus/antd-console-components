import React from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

// ac = access check = 访问检查（当前用户是否能访问该菜单）

const createAc = (code) => {
  return ({ userinfo, permission }) => {
    if (!permission) {
      return false;
    }
    return permission[code] || false;
  };
};

export default [
  {
    icon: <UserOutlined />,
    name: '主面板',
    path: '/',
  },
  {
    icon: <AppstoreOutlined />,
    name: '人员管理',
    path: '/person',
    children: [
      {
        icon: <AppstoreOutlined />,
        name: '员工管理(带权限)',
        path: '/staff',
        ac: createAc('pc-1'),
      },
      {
        icon: <BarChartOutlined />,
        name: '老师管理(带权限)',
        path: '/teacher',
        ac: createAc('pc-2'),
      },
      {
        icon: <CloudOutlined />,
        name: '学生管理',
        path: '/student',
      },
    ],
  },
  {
    icon: <ShopOutlined />,
    name: '科目管理(带权限)',
    path: '/subject',
    ac: createAc('pc-3'),
  },
  {
    icon: <TeamOutlined />,
    name: '课程管理(带权限)',
    path: '/course',
    ac: createAc('pc-4'),
  },
  {
    icon: <UploadOutlined />,
    name: '报名管理',
    path: '/join',
  },
  {
    icon: <VideoCameraOutlined />,
    name: '财务统计',
    path: '/finance',
  },
  {
    icon: <ShopOutlined />,
    name: '系统设置',
    path: '/setting',
  },
];
