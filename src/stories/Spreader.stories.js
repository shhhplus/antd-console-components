import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { withKnobs } from '@storybook/addon-knobs/react';
import { Button, Card } from 'antd';
import Spreader from '../components/Spreader';
import Actions from '../components/Actions';

storiesOf('Spreader', module)
  // .addDecorator(withKnobs)
  .add('标准', () => {
    return (
      <Card>
        <Spreader title="基本信息">
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
        </Spreader>
      </Card>
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
      <Card>
        <Spreader title="基本信息" extra={extra}>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
        </Spreader>
      </Card>
    );
  })
  .add('控制展开', () => {
    return (
      <Card>
        <Spreader title="基本信息" opened={false}>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
          <div>this is content</div>
        </Spreader>
      </Card>
    );
  });
