import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { withKnobs } from '@storybook/addon-knobs/react';
import Back from '../components/Back';

const Demo = ({ children }) => {
  return (
    <div style={{ background: '#F6F9FC', padding: '20px' }}>{children}</div>
  );
};

const content = (
  <div>
    <div>这里是页面1内容</div>
    <div>这里是页面内容</div>
    <div>这里是页面内容</div>
    <div>这里是页面内容</div>
    <div>这里是页面内容</div>
    <div>这里是页面内容</div>
    <div>这里是页面内容</div>
  </div>
);

storiesOf('Back', module)
  // .addDecorator(withKnobs)
  .add('标准', () => {
    return (
      <Demo>
        <Back
          onBack={() => {
            action('clicked');
          }}
        />
        {content}
      </Demo>
    );
  })
  .add('自定义文案', () => {
    return (
      <Demo>
        <Back
          text="返回首页"
          onBack={() => {
            action('clicked');
          }}
        />
        {content}
      </Demo>
    );
  });
