import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
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

export default ({ children, routes, drawerWidth }) => {
  const [width, setWidth] = useState(drawerWidth);
  const [exitUrl, setExitUrl] = useState('');
  const { url } = useRouteMatch();

  const history = useHistory();
  const location = useLocation();

  const pathname = useMemo(() => {
    return location.pathname;
  }, [location]);

  const visible = useMemo(() => {
    const matchedList = (routes || [])
      .map((route) => {
        return matchPath(pathname, {
          ...route,
          path: Array.isArray(route.path)
            ? route.path.map((p) => path.join(url, p))
            : path.join(url, route.path),
        });
      })
      .filter((route) => !!route);
    return matchedList.length > 0;
  }, [routes, pathname, url]);

  useEffect(() => {
    if (!visible) {
      setExitUrl(pathname);
    }
  }, [pathname, visible]);

  const exit = useCallback(() => {
    history.replace(exitUrl);
  }, [history, exitUrl]);

  useEffect(() => {
    console.log('[DrawerPageEntry] mounted');
  }, []);

  const routes2use = useMemo(() => {
    console.log('[DrawerPageEntry] routes changed');
    return (routes || []).map((route) => {
      const OriginalComponent = route.component;
      const WrappedComp = (props) => {
        useEffect(() => {
          console.log('[DrawerPageEntry] subpage onMounted:', route);
          setWidth(route.width || drawerWidth);
        }, []);
        return <OriginalComponent {...props} exit={exit} />;
      };

      return {
        path: Array.isArray(route.path)
          ? route.path.map((p) => path.join(url, p))
          : path.join(url, route.path),
        component: WrappedComp,
      };
    });
  }, [routes, drawerWidth, exit, url]);

  return (
    <Fragment>
      {children}
      <Drawer visible={visible} width={visible ? width : 0} onClose={exit}>
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