import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
  useMemo,
  ReactNode,
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

interface Props {
  children: ReactNode;
  routes: Array<any>;
  drawerWidth: number | string;
  keyboardClosable?: boolean;
}

export default ({
  children,
  routes,
  drawerWidth,
  keyboardClosable = false,
}: Props) => {
  const { url } = useRouteMatch();
  const [width, setWidth] = useState(drawerWidth);
  const [exitUrl, setExitUrl] = useState(url);

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
            ? route.path.map((p: string) => path.join(url, p))
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
      const WrappedComp = (props: any) => {
        useEffect(() => {
          console.log('[DrawerPageEntry] subpage onMounted:', route);
          setWidth(route.width || drawerWidth);
        }, []);
        return <OriginalComponent {...props} exit={exit} />;
      };

      return {
        path: Array.isArray(route.path)
          ? route.path.map((p: string) => path.join(url, p))
          : path.join(url, route.path),
        component: WrappedComp,
      };
    });
  }, [routes, drawerWidth, exit, url]);

  return (
    <Fragment>
      {children}
      <Drawer
        visible={visible}
        width={width}
        onClose={exit}
        destroyOnClose={false}
        keyboard={keyboardClosable}
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
