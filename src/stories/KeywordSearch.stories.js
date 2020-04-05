import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
// import { withKnobs } from '@storybook/addon-knobs/react';
import { Button } from 'antd';
import KeywordSearch from '../components/KeywordSearch';

const Demo = ({ children }) => {
  return (
    <div style={{ border: '3px solid #F6F9FC', padding: '50px 20px' }}>
      {children}
    </div>
  );
};

storiesOf('KeywordSearch', module)
  // .addDecorator(withKnobs)
  .add('标准', () => {
    return (
      <Demo>
        <KeywordSearch
          onSubmit={(keyword) => {
            console.log('[KeywordSearch] submit:', keyword);
          }}
        />
      </Demo>
    );
  })
  .add('左侧自定义', () => {
    return (
      <Demo>
        <KeywordSearch
          left={<Button type="primary">新建</Button>}
          onSubmit={(keyword) => {
            console.log('[KeywordSearch] submit:', keyword);
          }}
        />
      </Demo>
    );
  })
  .add('受控用法', () => {
    const [value, setValue] = useState('');
    return (
      <Demo>
        <KeywordSearch
          left={<Button type="primary">新建</Button>}
          value={value}
          onChange={setValue}
          onSubmit={() => {
            console.log('[KeywordSearch] submit:', value);
          }}
        />
        <div>value changed: {value}</div>
      </Demo>
    );
  });
