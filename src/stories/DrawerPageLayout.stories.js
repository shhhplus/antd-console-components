import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { withKnobs } from '@storybook/addon-knobs/react';
import { Space, Button, Card } from 'antd';
import Drawer from '../components/Drawer';
import DrawerPageLayout from '../components/DrawerPageLayout';
import Section from '../components/Section';
import Spreader from '../components/Spreader';

const Demo = ({ children }) => {
  return <div style={{ padding: '20px' }}>{children}</div>;
};

const content = <div style={{ background: '#F6F9FC', height: '120px' }}></div>;

storiesOf('DrawerPageLayout', module)
  // .addDecorator(withKnobs)
  .add('标准', () => {
    return (
      <Drawer visible={true}>
        <DrawerPageLayout title="我的服务">
          {content}
          {content}
        </DrawerPageLayout>
      </Drawer>
    );
  })
  .add('带刷新', () => {
    return (
      <Drawer visible={true}>
        <DrawerPageLayout
          title="我的服务"
          onFresh={() => {
            action('clicked');
          }}
        >
          {content}
          {content}
        </DrawerPageLayout>
      </Drawer>
    );
  })
  .add('带返回', () => {
    return (
      <Drawer visible={true}>
        <DrawerPageLayout title="我的服务" onBack={() => {}}>
          {content}
          {content}
        </DrawerPageLayout>
      </Drawer>
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
      <Drawer visible={true}>
        <DrawerPageLayout title="我的服务" extra={extra}>
          {content}
          {content}
        </DrawerPageLayout>
      </Drawer>
    );
  })
  .add('长内容', () => {
    const handleClick = (e, link) => {
      e.preventDefault();
      console.log('onChange', link);
    };

    return (
      <div>
        <ul>
          {new Array(50).fill('').map((item, idx) => {
            return <li key={idx}>{idx + 1}</li>;
          })}
        </ul>
        <Drawer visible={true}>
          <DrawerPageLayout title="我的服务">
            <Space
              size={20}
              direction="vertical"
              style={{
                width: '100%',
              }}
            >
              <Section title="基本信息">{content}</Section>
              <Section title="模块1">{content}</Section>
              <Section title="模块2">{content}</Section>
              <Section title="模块3">{content}</Section>
              <Section title="模块5">
                {content}
                {content}
              </Section>
            </Space>
          </DrawerPageLayout>
        </Drawer>
      </div>
    );
  })
  .add('带footer', () => {
    const footer = (
      <div style={{ textAlign: 'left' }}>
        <Space size={20}>
          <Button>取消</Button>
          <Button type="primary">提交</Button>
        </Space>
      </div>
    );
    return (
      <Drawer visible={true}>
        <DrawerPageLayout title="我的服务" footer={footer}>
          <Space
            size={20}
            direction="vertical"
            style={{
              width: '100%',
            }}
          >
            <Section title="模块1">{content}</Section>
            <Section title="模块2">{content}</Section>
            <Section title="模块3">{content}</Section>
            <Section title="模块4">{content}</Section>
          </Space>
        </DrawerPageLayout>
      </Drawer>
    );
  });
