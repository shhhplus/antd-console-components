import React, { useState } from 'react';
import { Card } from 'antd';
import { storiesOf } from '@storybook/react';
// import { withKnobs } from '@storybook/addon-knobs/react';
import { Button } from 'antd';
import KeywordSearch from '../components/KeywordSearch';

storiesOf('KeywordSearch', module)
  // .addDecorator(withKnobs)
  .add('标准', () => {
    return (
      <Card>
        <KeywordSearch
          onSubmit={(keyword) => {
            console.log('[KeywordSearch] submit:', keyword);
          }}
        />
      </Card>
    );
  })
  .add('左侧自定义', () => {
    return (
      <Card>
        <KeywordSearch
          left={<Button type="primary">新建</Button>}
          onSubmit={(keyword) => {
            console.log('[KeywordSearch] submit:', keyword);
          }}
        />
      </Card>
    );
  })
  .add('受控用法', () => {
    const [value, setValue] = useState('');
    return (
      <Card>
        <KeywordSearch
          left={<Button type="primary">新建</Button>}
          value={value}
          onChange={setValue}
          onSubmit={() => {
            console.log('[KeywordSearch] submit:', value);
          }}
        />
        <div>value changed: {value}</div>
      </Card>
    );
  });
