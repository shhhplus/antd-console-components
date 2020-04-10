import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { withKnobs } from '@storybook/addon-knobs/react';
import { Space, Button } from 'antd';
import Spreader from '../components/Spreader';

const Wrapper = ({ children }) => {
  return (
    <div
      style={{
        padding: '20px',
      }}
    >
      {children}
    </div>
  );
};

storiesOf('Spreader', module)
  // .addDecorator(withKnobs)
  .add('标准', () => {
    return (
      <Wrapper>
        <Spreader title="基本信息">
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
        </Spreader>
      </Wrapper>
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
      <Wrapper>
        <Spreader title="基本信息" extra={extra}>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
        </Spreader>
      </Wrapper>
    );
  })
  .add('控制展开', () => {
    return (
      <Wrapper>
        <Spreader title="基本信息" opened={false}>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
        </Spreader>
      </Wrapper>
    );
  });
