import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { withKnobs } from '@storybook/addon-knobs/react';
import { Button } from 'antd';
import Spreader from '../components/Spreader';
import Actions from '../components/Actions';

const Demo = ({ children }) => {
  return (
    <div style={{ background: '#F6F9FC', padding: '20px' }}>{children}</div>
  );
};

storiesOf('Spreader', module)
  // .addDecorator(withKnobs)
  .add('标准', () => {
    return (
      <Demo>
        <Spreader title="基本信息">
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
        </Spreader>
      </Demo>
    );
  })
  .add('带操作按钮', () => {
    const extra = (
      <Actions spacing={12}>
        <Button>重启</Button>
        <Button type="primary">删除</Button>
        <Button type="primary">编辑标签</Button>
      </Actions>
    );
    return (
      <Demo>
        <Spreader title="基本信息" extra={extra}>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
        </Spreader>
      </Demo>
    );
  })
  .add('控制展开', () => {
    return (
      <Demo>
        <Spreader title="基本信息" opened={false}>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
        </Spreader>
      </Demo>
    );
  });
