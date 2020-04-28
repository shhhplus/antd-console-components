import React, { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import { storiesOf } from '@storybook/react';
import PopPrompt from '../components/PopPrompt';

const StandardDemo = (props) => {
  const [visible, setVisible] = useState(false);

  const actions = (
    <Space>
      <Button
        type="primary"
        size="small"
        onClick={() => {
          console.log('submit.');
          setVisible(false);
        }}
      >
        我知道了
      </Button>
    </Space>
  );

  return (
    <div style={{ width: '300px', margin: '200px auto' }}>
      <PopPrompt
        title="信息标题"
        desc={
          <div style={{ maxWidth: '220px' }}>点击下方按钮可关闭弹出框！</div>
        }
        placement="topRight"
        visible={visible}
        onVisibleChange={setVisible}
        actions={actions}
      >
        <Button type="link" style={{ paddingLeft: 0, paddingRight: 0 }}>
          查看提示信息
        </Button>
      </PopPrompt>
    </div>
  );
};

const PopconfirmDemo = (props) => {
  const [visible, setVisible] = useState(false);
  const [processing, setProcessing] = useState(false);

  const actions = (
    <Space>
      <Button
        loading={processing}
        size="small"
        onClick={() => {
          setVisible(false);
        }}
      >
        取消
      </Button>
      <Button
        loading={processing}
        type="primary"
        size="small"
        onClick={() => {
          console.log('submit.');
          setProcessing(true);
          setTimeout(() => {
            setProcessing(false);
            setTimeout(() => {
              setVisible(false);
            }, 300);
          }, 1000);
        }}
      >
        确定
      </Button>
    </Space>
  );

  return (
    <div style={{ width: '300px', margin: '200px auto' }}>
      <PopPrompt
        title="确认删除该手机号吗？"
        desc={
          <div style={{ maxWidth: '220px' }}>
            手机号一旦删除，所有与其相关的功能都将无法使用，请谨慎操作！
          </div>
        }
        placement="topRight"
        visible={visible}
        onVisibleChange={setVisible}
        actions={actions}
        arrowPointAtCenter={true}
      >
        <Button type="link" style={{ paddingLeft: 0, paddingRight: 0 }}>
          重启
        </Button>
      </PopPrompt>
    </div>
  );
};

storiesOf('PopPrompt', module)
  .add('标准', StandardDemo)
  .add('确认框', PopconfirmDemo);
