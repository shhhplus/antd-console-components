import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { withKnobs } from '@storybook/addon-knobs/react';
import { Space, Button } from 'antd';
import Drawer from '../components/Drawer';

const Demo = ({ children }) => {
  return (
    <div style={{ background: '#F6F9FC', width: '200px', padding: '20px' }}>
      {children}
    </div>
  );
};

const StandardDemo = (porps) => {
  const [visible, setVisible] = useState(false);

  return (
    <Demo>
      <Space>
        <Button onClick={() => setVisible(true)}>打开抽屉</Button>
      </Space>
      <Drawer visible={visible} onClose={() => setVisible(false)}></Drawer>
    </Demo>
  );
};

storiesOf('Drawer', module)
  // .addDecorator(withKnobs)
  .add('标准', StandardDemo);
