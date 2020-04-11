import React from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Button, Card } from 'antd';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { withKnobs } from '@storybook/addon-knobs/react';
import RouteTabs from '../components/RouteTabs';

const parentPath = '/parent';

const China = () => {
  return <div>this is China component</div>;
};

const Japan = () => {
  return <div>this is Japan component</div>;
};

const Korea = () => {
  return <div>this is Korea component</div>;
};

const Singapore = () => {
  return <div>this is Singapore component</div>;
};

const Malaysia = () => {
  return <div>this is Malaysia component</div>;
};

const tabs = [
  {
    title: '中国',
    path: 'china',
    component: China,
  },
  {
    title: '日本',
    path: 'japan',
    component: Japan,
  },
  {
    title: '韩国',
    path: 'korea',
    component: Korea,
  },
  {
    title: '新加坡',
    path: 'singapore',
    component: Singapore,
  },
  {
    title: '马来西亚',
    path: 'malaysia',
    component: Malaysia,
  },
];

storiesOf('RouteTabs', module)
  // .addDecorator(withKnobs)
  .add('标准', () => {
    return (
      <Router>
        <div
          style={{
            margin: '0 0 50px 0',
            background: '#F6F9FC',
            padding: '20px',
          }}
        >
          <Link to={parentPath}>
            <Button type="primary">
              打开新标签页测试。可在浏览器地址输入栏查看路由的变化
            </Button>
          </Link>
        </div>
        <Switch>
          <Route path={parentPath}>
            <Card>
              <RouteTabs tabs={tabs} />
            </Card>
          </Route>
        </Switch>
      </Router>
    );
  });
