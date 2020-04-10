import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { withKnobs } from '@storybook/addon-knobs/react';
import { Space, Button } from 'antd';
import PageTitle from '../components/PageTitle';

const Demo = ({ children }) => {
  return <div style={{ padding: '20px' }}>{children}</div>;
};

storiesOf('PageTitle', module)
  // .addDecorator(withKnobs)
  .add('标准', () => {
    return (
      <Demo>
        <PageTitle title="我的服务"></PageTitle>
      </Demo>
    );
  })
  .add('带刷新', () => {
    return (
      <Demo>
        <PageTitle
          title="我的服务"
          onFresh={() => {
            action('clicked');
          }}
        ></PageTitle>
      </Demo>
    );
  })
  .add('带操作按钮', () => {
    const extra = (
      <Space size={12}>
        <Button>重启</Button>
        <Button type="primary">删除</Button>
        <Button type="primary">编辑标签</Button>
      </Space>
    );
    return (
      <Demo>
        <PageTitle title="我的服务" extra={extra}></PageTitle>
      </Demo>
    );
  });
