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
        name: '员工管理',
        path: '/staff',
      },
      {
        icon: <BarChartOutlined />,
        name: '老师管理',
        path: '/teacher',
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
    name: '科目管理',
    path: '/subject',
  },
  {
    icon: <TeamOutlined />,
    name: '课程管理',
    path: '/course',
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
