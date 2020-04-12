import React, { useEffect, useState, useMemo } from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Link as RelativeLink } from '@shhhplus/react-router-relative-link';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { withKnobs } from '@storybook/addon-knobs/react';
import { PageHeader, Space, Button, Card } from 'antd';
import PageLayout from '../components/PageLayout';
import DrawerPageLayout from '../components/DrawerPageLayout';
import DrawerPageEntry from '../components/DrawerPageEntry';
import RouteTabs from '../components/RouteTabs';

const parentPath = '/parent';

const App = ({ children }) => {
  return (
    <Router>
      <div style={{ margin: '0 0 50px 0' }}>
        <Link to={parentPath}>
          <Button type="primary">打开新标签页测试</Button>
        </Link>
        <div style={{ color: 'red', margin: '20px 0 0 0' }}>
          可以在一个抽屉中切换路由，并且设置不同的宽度。
        </div>
      </div>
      <Switch>
        <Route path={parentPath}>{children}</Route>
      </Switch>
    </Router>
  );
};

const Friend = ({ exit }) => {
  return (
    <DrawerPageLayout title="我的好友">
      <RelativeLink to={`../photo`}>
        <Button type="primary">我的照片</Button>
      </RelativeLink>
      <div style={{ height: '200px', background: 'red' }}></div>
      <Button type="primary" onClick={exit}>
        完成
      </Button>
    </DrawerPageLayout>
  );
};

const Photo = ({ exit }) => {
  return (
    <DrawerPageLayout title="我的照片">
      <RelativeLink to={`../friend`}>
        <Button type="primary">我的好友</Button>
      </RelativeLink>
      <div style={{ height: '200px', background: 'gray' }}></div>
      <Button type="primary" onClick={exit}>
        完成
      </Button>
    </DrawerPageLayout>
  );
};

const StandardDemo = (porps) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const i = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => {
      clearInterval(i);
    };
  }, []);

  const routes = useMemo(() => {
    return [
      {
        path: 'friend',
        component: Friend,
        width: '900px',
      },
      {
        path: 'photo',
        component: Photo,
        width: '700px',
      },
    ];
  }, []);

  return (
    <App>
      <DrawerPageEntry routes={routes} drawerWidth="1190px">
        <PageLayout header={<PageHeader title="标准" />}>
          <Card>
            <div style={{ margin: '0 0 20px 0' }}>
              模拟页面setState触发render。当前时间戳: {now}
            </div>
            <div
              style={{
                background: '#F6F9FC',
                padding: '20px',
                margin: '0 0 20px 0',
              }}
            >
              <Space>
                <RelativeLink to={`friend`}>
                  <Button type="primary">我的好友</Button>
                </RelativeLink>
                <RelativeLink to={`photo`}>
                  <Button type="primary">我的照片</Button>
                </RelativeLink>
              </Space>
            </div>
            <div>this is content.</div>
            <div>this is content.</div>
            <div>this is content.</div>
            <div>this is content.</div>
            <div>this is content.</div>
          </Card>
        </PageLayout>
      </DrawerPageEntry>
    </App>
  );
};

const DynamicDemo = (porps) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const i = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => {
      clearInterval(i);
    };
  }, []);

  const tabs = useMemo(() => {
    return [
      {
        path: '/china',
        title: '中国',
        component: () => {
          return 'china';
        },
      },
      {
        path: '/us',
        title: '美国',
        component: () => {
          return 'us';
        },
      },
    ];
  }, []);

  const routes = useMemo(() => {
    const list = tabs.map((t) => `${t.path}/create`);
    return [
      {
        path: ['/create', ...list],
        component: () => {
          return <DrawerPageLayout title="新增"></DrawerPageLayout>;
        },
        width: '900px',
      },
    ];
  }, []);

  console.log('routes:', routes);

  return (
    <App>
      <DrawerPageEntry routes={routes} drawerWidth="1190px">
        <PageLayout header={<PageHeader title="动态" />}>
          <Card>
            <div style={{ margin: '0 0 20px 0' }}>
              模拟页面setState触发render。当前时间戳: {now}
            </div>
            <div
              style={{
                background: '#F6F9FC',
                padding: '20px',
                margin: '0 0 20px 0',
              }}
            >
              <Space>
                <RelativeLink to={`create`} dynamic={true}>
                  <Button type="primary">新增</Button>
                </RelativeLink>
              </Space>
            </div>
            <div>this is content.</div>
            <div>this is content.</div>
            <div>this is content.</div>
            <RouteTabs tabs={tabs} />
          </Card>
        </PageLayout>
      </DrawerPageEntry>
    </App>
  );
};

storiesOf('DrawerPageEntry', module)
  // .addDecorator(withKnobs)
  .add('标准', StandardDemo)
  .add('动态', DynamicDemo);
