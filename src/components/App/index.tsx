import React, { ComponentType, useCallback, useMemo, useState } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Initializing from '../Initializing';
import Account from './Account';
import RouteMenu from '../RouteMenu';
import { GetUser } from '../_types';
import { useUser } from '../_user';
import styles from './index.module.scss';

const { Header, Content, Footer, Sider } = Layout;

interface LoginProps {
  onSuccess: () => void;
}

interface Props {
  getUser: GetUser;
  Login: ComponentType<LoginProps>;
  logout: () => Promise<void>;
  routes: Array<any>;
  menus: Array<any>;
}

export default ({ getUser, Login, logout, routes, menus }: Props) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const getUser2use = useMemo(() => {
    return () => {
      return getUser().finally(() => {
        setInitialized(true);
      });
    };
  }, [getUser]);

  const user = useUser(getUser2use);

  const onLoginSuccess = useCallback(() => {
    setInitialized(false);
    user.fetch();
  }, [user]);

  const onLogoutSuccess = useCallback(() => {
    setInitialized(false);
    user.fetch();
  }, [user]);

  const toggle = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  if (!initialized) {
    return <Initializing />;
  }

  if (!user.data) {
    return <Login onSuccess={onLoginSuccess} />;
  }

  return (
    <Router>
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
          trigger={null}
          collapsed={collapsed}
          collapsible={true}
          onCollapse={(collapsed, type) => {
            setCollapsed(collapsed);
          }}
        >
          <div className={styles['logo']} />
          <RouteMenu data={menus} />
        </Sider>
        <Layout
          className={styles['right']}
          style={{ marginLeft: collapsed ? 80 : 200 }}
        >
          <Header className={styles['header']}>
            <span className={styles['trigger']} onClick={toggle}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
            <div className={styles['header-right']}>
              <Account
                userinfo={user.data}
                onLogoutSubmit={logout}
                onLogoutSuccess={onLogoutSuccess}
              />
            </div>
          </Header>
          <Content className={styles['content']}>
            <Switch>
              {/* <Route path="/login" exact component={Login} /> */}
              {routes.map((route, idx) => {
                return <Route key={idx} {...route} />;
              })}
              {routes.length > 0 ? <Redirect to={routes[0].path} /> : null}
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>this is footer</Footer>
        </Layout>
      </Layout>
    </Router>
  );
};
