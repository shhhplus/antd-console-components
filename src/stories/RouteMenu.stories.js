import React, { useMemo } from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
} from '@ant-design/icons';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { withKnobs } from '@storybook/addon-knobs/react';
import { Space, Button } from 'antd';
import RouteMenu from '../components/RouteMenu';

const Demo = ({ children }) => {
  return <div style={{ padding: '20px' }}>{children}</div>;
};

const StandardDemo = () => {
  const data = useMemo(
    () => [
      {
        icon: <AppstoreOutlined />,
        name: '欧洲',
        path: '/europe',
      },
      {
        icon: <BarChartOutlined />,
        name: '亚洲',
        path: '/asia',
        type: 'sub',
        children: [
          {
            name: '中国',
            path: '/china',
            type: 'sub',
            children: [
              {
                name: '上海',
                path: '/shanghai',
              },
              {
                name: '北京',
                path: '/beijing',
              },
              {
                name: '江苏',
                path: '/jiangsu',
              },
              {
                name: '浙江',
                path: '/zhejiang',
              },
            ],
          },
          {
            name: '日本',
            path: '/japan',
          },
        ],
      },
      {
        icon: <CloudOutlined />,
        name: '非洲',
        path: '/africa',
        type: 'sub',
        children: [
          {
            name: '尼日利亚',
            path: '/nigeria',
          },
          {
            name: '摩洛哥',
            path: '/morocco',
          },
          {
            name: '安哥拉',
            path: '/angola',
          },
        ],
      },
    ],
    [],
  );

  return (
    <Router>
      <div
        style={{
          margin: '0 0 50px 0',
          background: '#F6F9FC',
          padding: '20px',
        }}
      >
        <Link to="/">
          <Button type="primary">
            打开新标签页测试。可在浏览器地址输入栏查看路由的变化
          </Button>
        </Link>
      </div>
      <div style={{ width: 256, margin: '0 0 0 50px' }}>
        <RouteMenu theme="light" mode="inline" data={data} />
      </div>
    </Router>
  );
};

storiesOf('RouteMenu', module)
  // .addDecorator(withKnobs)
  .add('标准', StandardDemo);
