import React, {
  ComponentType,
  ReactNode,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Layout, message } from 'antd';
import DefaultInitializing from '../Initializing';
import { Account } from '../headers';
import RouteMenu from '../RouteMenu';
import { GetUser } from '../_types';
import { useFetch } from '../hooks';
import { UserContext, PermissionContext } from '../_contexts';
import { filterMenus } from './utils';
import styles from './index.module.scss';

const { Header, Content, Footer, Sider } = Layout;

interface LoginProps {
  onSuccess: () => void;
}

interface Props {
  getPermission: () => Promise<any>;
  getUser: GetUser;
  logout: () => Promise<void>;
  routes: Array<any>;
  menus: Array<any>;
  Login: ComponentType<LoginProps>;
  Initializing: ComponentType<any>;
  headers?: ReactNode;
}

const _sider_width = [80, 200];

export default ({
  Login,
  Initializing,
  getUser,
  getPermission,
  logout,
  routes,
  menus,
  headers,
}: Props) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [permissionFetched, setPermissionFetched] = useState<boolean>(false);

  const Initializing2Use = useMemo(() => {
    return Initializing || DefaultInitializing;
  }, [Initializing]);

  const getUser2use = useCallback(() => {
    return getUser()
      .then(
        (res) => {
          return res;
        },
        (msg) => {
          message.error({
            content: msg,
          });
        },
      )
      .finally(() => {
        setInitialized(true);
      });
  }, [getUser]);

  const getPermission2use = useCallback(() => {
    if (!getPermission) {
      setPermissionFetched(true);
      return Promise.resolve();
    }
    return getPermission().finally(() => {
      setPermissionFetched(true);
    });
  }, [getPermission]);

  const user = useFetch(getUser2use);
  const fetchUser = useMemo(() => user.fetch, [user]);
  const userinfo = useMemo(() => user.data, [user]);

  const permission = useFetch(getPermission2use);
  const fetchPermission = useMemo(() => permission.fetch, [permission]);
  const permissionData = useMemo(() => permission.data, [permission]);

  const onLoginSuccess = useCallback(() => {
    setInitialized(false);
    user.fetch();
  }, [user]);

  const toggle = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  // 权限过滤
  const menus2use = useMemo(() => {
    if (!userinfo) {
      return [];
    }
    const after = filterMenus(menus, {
      userinfo,
      permission: permissionData,
    });
    console.log('menus:', {
      before: menus,
      after,
    });
    return after;
  }, [userinfo, permissionData, menus]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (permissionFetched) {
      return;
    }
    fetchPermission();
  }, [permissionFetched, fetchPermission]);

  if (!initialized) {
    return <Initializing2Use />;
  }

  if (!user.data) {
    return <Login onSuccess={onLoginSuccess} />;
  }

  return (
    <UserContext.Provider value={user}>
      <PermissionContext.Provider value={permission}>
        <div className={styles['app']}>
          <Router>
            <Layout>
              <Sider className={styles['sider']} collapsed={collapsed}>
                <div className={styles['logo']} />
                <RouteMenu data={menus2use} />
              </Sider>
              <Layout
                className={styles['right']}
                style={{
                  marginLeft: collapsed ? _sider_width[0] : _sider_width[1],
                }}
              >
                <Header
                  className={styles['header']}
                  style={{
                    left: collapsed ? _sider_width[0] : _sider_width[1],
                  }}
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
                    {routes.length > 0 ? (
                      <Redirect to={routes[0].path} />
                    ) : null}
                  </Switch>
                </Content>
                <Footer style={{ textAlign: 'center' }}>this is footer</Footer>
              </Layout>
            </Layout>
          </Router>
        </div>
      </PermissionContext.Provider>
    </UserContext.Provider>
  );
};
