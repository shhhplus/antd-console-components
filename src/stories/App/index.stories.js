import React, { useCallback, Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import App from '../../components/App';
import Login from '../../components/Login';
import { Account } from '../../components/headers';
import menus from './menus';
import Dashboard from './Dashboard';
import Staff from './Staff';
import Teacher from './Teacher';
import Student from './Student';

const _admin = {
  id: 1,
  name: 'admin',
  avatar:
    'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  password: '123456',
};

const user = {
  get: () => {
    const json = window.localStorage.getItem('user');
    if (json) {
      return JSON.parse(json);
    } else {
      return null;
    }
  },
  set: (user) => {
    window.localStorage.setItem('user', user ? JSON.stringify(user) : '');
  },
};

const getUser = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user.get());
    }, 500);
  });
};

const LoginPage = ({ onSuccess }) => {
  const submit = useCallback(({ username, password }) => {
    return new Promise((resolve, reject) => {
      if (username !== _admin.name || password !== _admin.password) {
        setTimeout(() => {
          reject('对不起，用户名密码错误，请重新输入。');
        }, 500);
      } else {
        setTimeout(() => {
          user.set(_admin);
          resolve();
        }, 500);
      }
    });
  }, []);
  return <Login onSubmit={submit} onSuccess={onSuccess} />;
};

const logout = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        user.set(null);
        resolve(true);
      } else {
        reject('对不起，退出失败。请重试。');
      }
    }, 500);
  });
};

const routes = [
  {
    path: '/',
    component: Dashboard,
    exact: true,
  },
  {
    path: '/person/staff',
    component: Staff,
  },
  {
    path: '/person/teacher',
    component: Teacher,
  },
  {
    path: '/person/student',
    component: Student,
  },
];

const Demo = () => {
  return (
    <App
      Login={LoginPage}
      getUser={getUser}
      logout={logout}
      routes={routes}
      menus={menus}
      headers={
        <Fragment>
          <Account onLogoutSubmit={logout}></Account>
          <Account onLogoutSubmit={logout}>
            <Menu.Item key="uc">
              <UserOutlined />
              个人中心
            </Menu.Item>
            <Menu.Item key="settings">
              <SettingOutlined />
              个人设置
            </Menu.Item>
            <Menu.Divider />
          </Account>
        </Fragment>
      }
    />
  );
};

storiesOf('App', module).add('标准', Demo);
