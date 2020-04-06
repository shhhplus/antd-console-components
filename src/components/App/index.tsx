import React, { ComponentType, useCallback, useMemo, useState } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Initializing from '../Initializing';
import { GetUser } from '../types';
import { useUser } from '../user';
import styles from './index.module.scss';

const { Header, Content, Footer, Sider } = Layout;

interface LoginProps {
  onSuccess: () => void;
}

interface Props {
  getUser: GetUser;
  Login: ComponentType<LoginProps>;
  routes: Array<any>;
  menus: Array<any>;
}

const Menus = ({ menus }: { menus: Array<any> }) => {
  return (
    <Menu theme="dark" mode="inline">
      {menus.map(({ icon, name, path }) => {
        return (
          <Menu.Item key={name}>
            <Link to={path}>
              {icon}
              <span>{name}</span>
            </Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default ({ getUser, Login, routes, menus }: Props) => {
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
          collapsed={collapsed}
          collapsible={true}
          onCollapse={(collapsed, type) => {
            setCollapsed(collapsed);
          }}
        >
          <div className={styles['logo']} />
          <Menus menus={menus} />
        </Sider>
        <Layout
          className={styles['right']}
          style={{ marginLeft: collapsed ? 80 : 200 }}
        >
          <Header className={styles['header']} />
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
