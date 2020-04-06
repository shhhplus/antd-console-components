import React, { FC, ReactNode, useCallback, useState } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Actions from '../Actions';
import styles from './index.module.scss';

export interface LoginProps {
  title: ReactNode;
  bgStyle: Object;
  onSubmit: (values: Object) => Promise<void>;
  onSuccess: () => void;
}

const Login: FC<LoginProps> = ({
  title = '登录',
  bgStyle,
  onSubmit,
  onSuccess,
}: LoginProps) => {
  const [form] = Form.useForm();
  const [processing, setProcessing] = useState(false);

  const submit = useCallback(() => {
    if (processing) {
      return;
    }

    setProcessing(true);
    form.validateFields().then(
      (values) => {
        if (onSubmit) {
          onSubmit(values)
            .then(onSuccess, (msg) => {
              msg && message.error(msg);
            })
            .finally(() => {
              setProcessing(false);
            });
        } else {
          setProcessing(false);
        }
      },
      () => {
        setProcessing(false);
      },
    );
  }, [form, processing, onSubmit, onSuccess]);

  const reset = useCallback(() => {
    form.resetFields();
  }, [form]);

  return (
    <div className={styles.bg} style={bgStyle}>
      <div className={styles.main}>
        <Card title={title}>
          <Form form={form}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input
                prefix={<LockOutlined />}
                placeholder="密码"
                type="password"
              />
            </Form.Item>
          </Form>
          <div className={styles.actions}>
            <Actions>
              <Button type="primary" loading={processing} onClick={submit}>
                确定
              </Button>
              <Button htmlType="button" loading={processing} onClick={reset}>
                清空重填
              </Button>
            </Actions>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
