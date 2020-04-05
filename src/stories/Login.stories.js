import React from 'react';
import { Button } from 'antd';
import { storiesOf } from '@storybook/react';
import Login from '../components/Login';

export const Basic = () => {
  const submit = (values) => {
    console.log('submit', values);
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return <Login title="欢迎登录" onSubmit={submit} />;
};

export const CustomizeBg = () => {
  const bgStyle = {
    background: 'lightgray',
  };

  const submit = (values) => {
    console.log('submit', values);
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return <Login bgStyle={bgStyle} onSubmit={submit} />;
};

storiesOf('Login', module).add('基本', Basic).add('定制背景', CustomizeBg);
