import React, { Fragment, useEffect, useState, useCallback } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { matchPath } from 'react-router';
import path from 'path';
import Drawer from '../Drawer';
import styles from './index.module.scss';

export default ({ children, routes, drawerWidth }) => {
  const [routes2use, setRoutes2Use] = useState([]);
  const [classname, setClassname] = useState('');
  const [width, setWidth] = useState(drawerWidth);
  const { url } = useRouteMatch();

  const history = useHistory();
  const location = useLocation();
  const matchedList = (routes || [])
    .map((route) => {
      return matchPath(location.pathname, {
        ...route,
        path: path.join(url, route.path),
      });
    })
    .filter((route) => !!route);
  const visible = matchedList.length > 0;

  const exit = useCallback(() => {
    history.replace(url);
  }, [history, url]);

  // 抽屉的width变化时，有过度效果
  // 直接覆盖样式会导致抽屉首次打开时动画效果错误，所以在抽屉打开以后再加
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setClassname(styles['drawer']), 1000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  useEffect(() => {
    console.log('[DrawerEntryPage] mounted');
  }, []);

  useEffect(() => {
    console.log('[DrawerEntryPage] routes changed');
    setRoutes2Use(
      (routes || []).map((route) => {
        const OriginalComponent = route.component;
        const WrappedComp = (props) => {
          useEffect(() => {
            console.log('[DrawerEntryPage] subpage onMounted:', route);
            setWidth(route.width || drawerWidth);
          }, []);
          return <OriginalComponent {...props} exit={exit} />;
        };
        return {
          path: path.join(url, route.path),
          component: WrappedComp,
        };
      }),
    );
  }, [routes, drawerWidth, exit, url]);

  return (
    <Fragment>
      {children}
      <Drawer
        className={classname}
        visible={visible}
        width={visible ? width : 0}
        onClose={exit}
      >
        <Switch>
          {routes2use.map((route, idx) => {
            return (
              <Route key={idx} path={route.path} component={route.component} />
            );
          })}
        </Switch>
      </Drawer>
    </Fragment>
  );
};
