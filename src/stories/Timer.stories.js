import React, { useState, useCallback, useRef } from 'react';
import { Card } from 'antd';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { withKnobs } from '@storybook/addon-knobs/react';
import Timer from '../components/Timer';

const Demo = ({ children }) => {
  return (
    <div style={{ width: '500px', margin: '100px auto' }}>
      <Card>{children}</Card>
    </div>
  );
};

const SyncTask = () => {
  const [count, setCount] = useState(0);

  const countRef = useRef(count);
  const interval = 1000;

  const onElapsed = useCallback(() => {
    countRef.current = countRef.current + 1;
    setCount(countRef.current);
  }, []);

  return (
    <Demo>
      <div>每{interval}ms执行一次</div>
      <div>第{count}次触发</div>
      <Timer interval={interval} onElapsed={onElapsed} />
      <Timer
        interval={5000}
        onElapsed={() => {
          console.log('onElapsed. now:', Date.now() / 1000);
        }}
      />
    </Demo>
  );
};

const AsyncTask = () => {
  const [count, setCount] = useState(0);

  const countRef = useRef(count);
  const interval = 1000;
  const duration = 2000;

  const onElapsed = useCallback(() => {
    countRef.current = countRef.current + 1;
    setCount(countRef.current);

    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  }, []);

  return (
    <Demo>
      <div>
        在异步任务(耗时{duration}ms)执行完之后，等待{interval}ms再执行下一次。
      </div>
      <div>第{count}次触发</div>
      <Timer interval={interval} onElapsed={onElapsed} />
    </Demo>
  );
};

storiesOf('Timer', module)
  // .addDecorator(withKnobs)
  .add('执行同步任务的Timer', SyncTask)
  .add('执行异步任务的Timer', AsyncTask);
