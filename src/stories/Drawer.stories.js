import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { withKnobs,   } from '@storybook/addon-knobs/react';
import { Button } from 'antd';
import Page from '../components/Page';
import Actions from '../components/Actions';
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
      <Actions>
        <Button onClick={() => setVisible(true)}>打开抽屉</Button>
      </Actions>
      <Drawer visible={visible} onClose={() => setVisible(false)}>
        <Page title="详情">
          <div style={{ lineHeight: '300px' }}>this is content.</div>
          <div style={{ lineHeight: '300px' }}>this is content.</div>
          <div style={{ lineHeight: '300px' }}>this is content.</div>
        </Page>
      </Drawer>
    </Demo>
  );
};

storiesOf('Drawer', module)
  // .addDecorator(withKnobs)
  .add('标准', StandardDemo);
