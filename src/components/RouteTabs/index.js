import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import path from 'path';
import { Tabs } from 'antd';
import { Link as RelativeLink } from '@shhhplus/react-router-relative-link';
import styles from './index.module.scss';

export default ({ tabs = [] }) => {
  const { url } = useRouteMatch();

  useEffect(() => {
    console.log('[LinkTabs] mounted. url:', url);
  }, [url]);

  useEffect(() => {
    console.log('[LinkTabs] tabs changed.tabs:', tabs);
  }, [tabs]);

  return (
    <Switch>
      {tabs.map((i) => {
        return (
          <Route
            key={i.path}
            path={path.join(url, i.path)}
            render={() => {
              console.log('[LinkTabs] render.', i);
              return (
                <Tabs activeKey={i.path} className={styles.tabs}>
                  {tabs.map((j) => {
                    const tab =
                      j.path === i.path ? (
                        j.title
                      ) : (
                        <RelativeLink to={`../${j.path}`}>
                          {j.title}
                        </RelativeLink>
                      );
                    const Comp = j.component;
                    return (
                      <Tabs.TabPane tab={tab} key={j.path}>
                        {j.path === i.path ? <Comp /> : null}
                      </Tabs.TabPane>
                    );
                  })}
                </Tabs>
              );
            }}
          />
        );
      })}

      {tabs.length ? <Redirect to={path.join(url, tabs[0].path)} /> : null}
    </Switch>
  );
};
