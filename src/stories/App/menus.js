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
    name: '员工管理',
    path: '/staff',
  },
  {
    icon: <BarChartOutlined />,
    name: '老师管理',
  },
  {
    icon: <CloudOutlined />,
    name: '用户管理',
  },
  {
    icon: <ShopOutlined />,
    name: '科目管理',
  },
  {
    icon: <TeamOutlined />,
    name: '课程管理',
  },
  {
    icon: <UploadOutlined />,
    name: '报名管理',
  },
  {
    icon: <VideoCameraOutlined />,
    name: '财务统计',
  },
  {
    icon: <ShopOutlined />,
    name: '系统设置',
  },
];
