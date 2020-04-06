import React, { useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import App from '../../components/App';
import Login from '../../components/Login';
import Dashboard from './Dashboard';
import Staff from './Staff';
import menus from './menus';

const _admin = {
  id: 1,
  name: 'mark',
  avata: 'https://',
  password: '123456',
};

let user = null;

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
    component: Dashboard,
    exact: true,
  },
  {
    path: '/staff',
    component: Staff,
  },
];

const Demo = () => {
  return (
    <App getUser={getUser} Login={LoginPage} routes={routes} menus={menus} />
  );
};

storiesOf('App', module).add('标准', Demo);
