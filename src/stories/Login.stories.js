import React from 'react';
import { Button } from 'antd';
import { storiesOf } from '@storybook/react';
import Login from '../components/Login';

const Success = () => {
  return (
    <Login
      title="欢迎登录"
      onSubmit={(values) => {
        console.log('submit', values);
        return new Promise((resolve) => setTimeout(resolve, 1000));
      }}
      onSuccess={() => {
        console.log('登录成功');
      }}
    />
  );
};

const Fail = () => {
  return (
    <Login
      title="欢迎登录"
      onSubmit={(values) => {
        console.log('submit', values);
        return new Promise((resolve, reject) =>
          setTimeout(() => {
            reject('登录失败，失败原因为。。。');
          }, 1000),
        );
      }}
      onSuccess={() => {}}
    />
  );
};

const CustomizeBg = () => {
  const bgStyle = {
    background: 'lightgray',
  };

  return (
    <Login
      bgStyle={bgStyle}
      onSubmit={(values) => {
        console.log('submit', values);
        return new Promise((resolve) => setTimeout(resolve, 1000));
      }}
      onSuccess={() => {}}
    />
  );
};

storiesOf('Login', module)
  .add('登录成功', Success)
  .add('登录失败', Fail)
  .add('定制背景', CustomizeBg);
