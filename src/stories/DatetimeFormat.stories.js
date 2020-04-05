import React from 'react';
import { storiesOf } from '@storybook/react';
// import { withKnobs } from '@storybook/addon-knobs/react';
import DatetimeFormat from '../components/DatetimeFormat';

storiesOf('DatetimeFormat', module)
  // .addDecorator(withKnobs)
  .add('年月日时分秒', () => {
    return <DatetimeFormat value={Date.now()} />;
  })
  .add('年月日', () => {
    return <DatetimeFormat.Date value={Date.now()} />;
  })
  .add('时分秒', () => {
    return <DatetimeFormat.Time value={Date.now()} />;
  })
  .add('无效时间', () => {
    return <DatetimeFormat value="0001-01-01T08:00:00+08:00" />;
  });
