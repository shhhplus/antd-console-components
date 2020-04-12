import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { withKnobs,   } from '@storybook/addon-knobs/react';
import { Space, Button } from 'antd';
import DrawerPageLayout from '../components/DrawerPageLayout';
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
      <Drawer visible={visible} onClose={() => setVisible(false)}>
        <DrawerPageLayout title="详情">
          {new Array(30).fill('').map((item, idx) => {
            return (
              <div key={idx} style={{ lineHeight: '50px' }}>
                {idx + 1}.this is content
              </div>
            );
          })}
        </DrawerPageLayout>
      </Drawer>
    </Demo>
  );
};

storiesOf('Drawer', module)
  // .addDecorator(withKnobs)
  .add('标准', StandardDemo);
