import React, { useMemo, ComponentType } from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import path from 'path';
import RouteMenu from '../RouteMenu';
import styles from './index.module.scss';

interface RouteMenuTabsProps {
  tabs: Array<{
    title: string;
    path: string;
    component: ComponentType<any>;
  }>;
}

export default ({ tabs }: RouteMenuTabsProps) => {
  const { url: baseUrl } = useRouteMatch();

  const data = useMemo(() => {
    return tabs.map((t) => {
      return {
        path: t.path,
        name: t.title,
      };
    });
  }, [tabs]);

  return (
    <div className={styles['page']}>
      <div className={styles['page-left']}>
        <RouteMenu theme="light" mode="inline" baseUrl={baseUrl} data={data} />
      </div>
      <div className={styles['page-right']}>
        <Switch>
          {tabs.map((t) => {
            return (
              <Route
                key={t.path}
                path={path.join(baseUrl, t.path)}
                component={t.component}
              />
            );
          })}
          {tabs.length ? (
            <Redirect to={path.join(baseUrl, tabs[0].path)} />
          ) : null}
        </Switch>
      </div>
    </div>
  );
};
