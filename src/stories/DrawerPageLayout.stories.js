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

storiesOf('DrawerPageLayout', module)
  // .addDecorator(withKnobs)
  .add('标准', () => {
    return (
      <Drawer visible={true}>
        <DrawerPageLayout title="我的服务">
          <Card>
            <div>这里是页面内容</div>
            <div>这里是页面内容</div>
            <div>这里是页面内容</div>
          </Card>
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
          <Card>
            <div>这里是页面内容</div>
            <div>这里是页面内容</div>
            <div>这里是页面内容</div>
          </Card>
        </DrawerPageLayout>
      </Drawer>
    );
  })
  .add('带返回', () => {
    return (
      <Drawer visible={true}>
        <DrawerPageLayout title="我的服务" onBack={() => {}}>
          <Card>
            <div>这里是页面内容</div>
            <div>这里是页面内容</div>
            <div>这里是页面内容</div>
          </Card>
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
          <Card>
            <div>这里是页面内容</div>
            <div>这里是页面内容</div>
            <div>这里是页面内容</div>
          </Card>
        </DrawerPageLayout>
      </Drawer>
    );
  })
  .add('长内容', () => {
    const handleClick = (e, link) => {
      e.preventDefault();
      console.log('onChange', link);
    };

    const content = <div style={{ background: '#F6F9FC', height: '120px' }} />;

    return (
      <Drawer visible={true}>
        <DrawerPageLayout title="我的服务">
          <div style={{ marginBottom: '40px' }}>
            <Spreader title="基本信息">
              <div>这里是基本信息</div>
              <div>这里是基本信息</div>
              <div>这里是基本信息</div>
            </Spreader>
          </div>
          <Section id="pg1" title="模块1">
            {content}
          </Section>
          <Section id="pg2" title="模块2">
            {content}
          </Section>
          <Section id="pg3" title="模块3">
            {content}
          </Section>
          <Section id="pg4" title="模块4">
            {content}
          </Section>
          <Section id="pg5" title="模块5">
            {content}
          </Section>
          <Section id="pg6" title="模块6">
            {content}
            {content}
            {content}
            {content}
            {content}
          </Section>
        </DrawerPageLayout>
      </Drawer>
    );
  });
