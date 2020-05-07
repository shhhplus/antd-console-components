import React, { useState, useCallback } from 'react';
import { Card } from 'antd';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { withKnobs } from '@storybook/addon-knobs/react';
import YmdPicker from '../components/YmdPicker';

const Demo = ({ children }) => {
  return (
    <div style={{ width: '500px', margin: '100px auto' }}>
      <Card>{children}</Card>
    </div>
  );
};

const Standard = () => {
  const [value, setValue] = useState();

  const onChange = useCallback((val) => {
    setValue(val);
  }, []);

  return (
    <Demo>
      <div style={{ marginBottom: '10px' }}>
        年月日：<span>{JSON.stringify(value)}</span>
      </div>
      <YmdPicker value={value} onChange={onChange} />
    </Demo>
  );
};

storiesOf('YmdPicker', module)
  // .addDecorator(withKnobs)
  .add('标准', Standard);
