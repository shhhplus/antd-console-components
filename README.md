基于 react 16.x、antd 4.x、react-router-dom 5.x 封装的控制台组件库。

# Introduction

对控制台类型网站的通用组件做了封装，通过简单的配置就能搭建一个完整的 App，随后开发单个页面即可。[查看 Demo](https://shhhplus.github.io/antd-console-components-demo)。

# Install

```bash
npm install antd-console-components --save
```

# Doc

[查看 Api 文档](https://shhhplus.github.io/antd-console-components)

[查看 Demo 源代码](https://github.com/shhhplus/antd-console-components-demo)

# Usage

```jsx
import React, { Fragment, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { PageHeader, Menu } from 'antd';
import {
  BarChartOutlined,
  CloudOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { App, Login, PageLayout, Section, headers } from 'antd-console-components';

const { Account } = headers;

const DashboardPage = () => {
  return (
    <PageLayout header={<PageHeader title="主面板" />}>
      <Section title="我的待办" onFresh={() => {}}>
        <div style={{ padding: '0 0 60px 0' }}>todo 1</div>
        <div style={{ padding: '0 0 60px 0' }}>todo 2</div>
        <div style={{ padding: '0 0 60px 0' }}>todo 3</div>
      </Section>
      <Section title="通知" onFresh={() => {}}>
        <div style={{ padding: '0 0 60px 0' }}>notification 1</div>
        <div style={{ padding: '0 0 60px 0' }}>notification 2</div>
        <div style={{ padding: '0 0 60px 0' }}>notification 3</div>
      </Section>
    </PageLayout>
  );
};

const TeacherPage = () => {
  return (
    <PageLayout header={<PageHeader title="老师管理" />}>
      <Section title="语文老师" onFresh={() => {}}>
        <div style={{ padding: '0 0 60px 0' }}>teacher 1</div>
        <div style={{ padding: '0 0 60px 0' }}>teacher 2</div>
        <div style={{ padding: '0 0 60px 0' }}>teacher 3</div>
      </Section>
      <Section title="数学老师" onFresh={() => {}}>
        <div style={{ padding: '0 0 60px 0' }}>teacher 1</div>
        <div style={{ padding: '0 0 60px 0' }}>teacher 2</div>
        <div style={{ padding: '0 0 60px 0' }}>teacher 3</div>
      </Section>
    </PageLayout>
  );
};

const StudentPage = () => {
  return (
    <PageLayout header={<PageHeader title="学生管理" />}>
      <Section title="高中学生" onFresh={() => {}}>
        <div style={{ padding: '0 0 60px 0' }}>student 1</div>
        <div style={{ padding: '0 0 60px 0' }}>student 2</div>
        <div style={{ padding: '0 0 60px 0' }}>student 3</div>
      </Section>
      <Section title="初中学生" onFresh={() => {}}>
        <div style={{ padding: '0 0 60px 0' }}>student 1</div>
        <div style={{ padding: '0 0 60px 0' }}>student 2</div>
        <div style={{ padding: '0 0 60px 0' }}>student 3</div>
      </Section>
    </PageLayout>
  );
};

const menus = [
  {
    icon: <UserOutlined />,
    name: '主面板',
    path: '/',
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
];

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
    component: DashboardPage,
    exact: true,
  },
  {
    path: '/teacher',
    component: TeacherPage,
  },
  {
    path: '/student',
    component: StudentPage,
  },
];

const DemoApp = () => {
  return (
    <App
      getUser={getUser}
      Login={LoginPage}
      logout={logout}
      routes={routes}
      menus={menus}
      headers={
        <Fragment>
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
    />
  );
};

ReactDOM.render(<DemoApp />, document.getElementById('root'));
```
