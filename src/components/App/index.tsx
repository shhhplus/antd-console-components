import React, { ComponentType, ReactNode, useCallback, useState } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Layout } from 'antd';
import Initializing from '../Initializing';
import { Account } from '../headers';
import RouteMenu from '../RouteMenu';
import { GetUser } from '../_types';
import { useFetch } from '../hooks';
import { UserContext } from '../contexts';
import styles from './index.module.scss';

const { Header, Content, Footer, Sider } = Layout;

interface LoginProps {
  onSuccess: () => void;
}

interface Props {
  getUser: GetUser;
  logout: () => Promise<void>;
  routes: Array<any>;
  menus: Array<any>;
  Login: ComponentType<LoginProps>;
  headers?: ReactNode;
}

const _sider_width = [80, 200];

export default ({ Login, getUser, logout, routes, menus, headers }: Props) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const getUser2use = useCallback(() => {
    return getUser().finally(() => {
      setInitialized(true);
    });
  }, [getUser]);

  const user = useFetch(getUser2use);

  const onLoginSuccess = useCallback(() => {
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
    <div className={styles['app']}>
      <UserContext.Provider value={user}>
        <Router>
          <Layout>
            <Sider className={styles['sider']} collapsed={collapsed}>
              <div className={styles['logo']} />
              <RouteMenu data={menus} />
            </Sider>
            <Layout
              className={styles['right']}
              style={{
                marginLeft: collapsed ? _sider_width[0] : _sider_width[1],
              }}
            >
              <Header
                className={styles['header']}
                style={{ left: collapsed ? _sider_width[0] : _sider_width[1] }}
              >
                {/* <span className={styles['trigger']} onClick={toggle}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span> */}
                <div className={styles['header-right']}>
                  {headers ? headers : <Account onLogoutSubmit={logout} />}
                </div>
              </Header>
              <Content className={styles['content']}>
                <Switch>
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
      </UserContext.Provider>
    </div>
  );
};
