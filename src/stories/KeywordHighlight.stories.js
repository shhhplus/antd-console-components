import React from 'react';
import { Card } from 'antd';
import { storiesOf } from '@storybook/react';
// import { withKnobs } from '@storybook/addon-knobs/react';
import KeywordHighlight from '../components/KeywordHighlight';

storiesOf('KeywordHighlight', module)
  // .addDecorator(withKnobs)
  .add('标准', () => {
    return (
      <Card>
        <KeywordHighlight
          content="中国上海浦东新区上海出入境管理局"
          keyword="上海"
        />
      </Card>
    );
  });
