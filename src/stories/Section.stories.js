import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { withKnobs } from '@storybook/addon-knobs/react';
import { FundOutlined } from '@ant-design/icons';
import Section from '../components/Section';

const Demo = ({ children }) => {
  return <div style={{ padding: '20px' }}>{children}</div>;
};

const content = <div style={{ background: '#F6F9FC', height: '120px' }}></div>;

storiesOf('Section', module)
  // .addDecorator(withKnobs)
  .add('标准', () => {
    return (
      <Demo>
        <Section title="我的服务">{content}</Section>
      </Demo>
    );
  })
  .add('带icon', () => {
    const icon = <FundOutlined />;
    return (
      <Demo>
        <Section title="我的服务" icon={icon}>
          {content}
        </Section>
      </Demo>
    );
  })
  .add('带刷新', () => {
    return (
      <Demo>
        <Section title="我的服务" onFresh={() => {}}>
          {content}
        </Section>
      </Demo>
    );
  })
  .add('无标题', () => {
    return (
      <Demo>
        <Section onFresh={() => {}}>{content}</Section>
      </Demo>
    );
  })
  .add('多个', () => {
    return (
      <Demo>
        <Section onFresh={() => {}}>{content}</Section>
        <Section title="我的应用">{content}</Section>
        <Section title="我的服务" onFresh={() => {}}>
          {content}
        </Section>
        <Section title="我的集群">{content}</Section>
      </Demo>
    );
  });
