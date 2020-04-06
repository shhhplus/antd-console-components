import React, { useCallback } from 'react';
import { storiesOf } from '@storybook/react';
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
import App from '../components/App';
import Login from '../components/Login';
import Page from '../components/Page';

const _admin = {
  id: 1,
  name: 'mark',
  avata: 'https://',
  password: '123456',
};

let user = _admin;

const getUser = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user);
    }, 500);
  });
};

const LoginPage = ({ onSuccess }) => {
  const submit = useCallback(({ username, password }) => {
    return new Promise((resolve, reject) => {
      if (username !== _admin.name && password !== _admin.password) {
        setTimeout(() => {
          reject('对不起，用户名密码错误，请重新输入。');
        }, 500);
      } else {
        setTimeout(() => {
          user = _admin;
          resolve();
        }, 500);
      }
    });
  }, []);
  return <Login onSubmit={submit} onSuccess={onSuccess} />;
};

const routes = [
  {
    path: '/',
    component: () => {
      return (
        <Page title="主面板">
          <div style={{ padding: '0 0 200px 0' }}>dashboard</div>
          <div style={{ padding: '0 0 200px 0' }}>dashboard</div>
          <div style={{ padding: '0 0 200px 0' }}>dashboard</div>
          <div style={{ padding: '0 0 200px 0' }}>dashboard</div>
          <div style={{ padding: '0 0 200px 0' }}>dashboard</div>
        </Page>
      );
    },
  },
];

const menus = [
  {
    icon: <UserOutlined />,
    name: '主面板',
    path: '/',
  },
  {
    icon: <AppstoreOutlined />,
    name: '账号管理',
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

const Demo = () => {
  return (
    <App getUser={getUser} Login={LoginPage} routes={routes} menus={menus} />
  );
};

storiesOf('App', module).add('标准', Demo);
