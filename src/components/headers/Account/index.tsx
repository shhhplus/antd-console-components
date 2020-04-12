import React, { ReactNode, useMemo, useCallback } from 'react';
import { Dropdown, Menu, Avatar, message } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { UseUserResult } from '../../_types';
import { useUser } from '../../user';
import styles from './index.module.scss';

interface Props {
  user: UseUserResult;
  children?: ReactNode;
  onLogoutSubmit: () => Promise<void>;
}

export default ({ children, onLogoutSubmit }: Props) => {
  const user = useUser();
  const userinfo = useMemo(() => user.data, [user]);

  const logout = useCallback(() => {
    onLogoutSubmit().then(
      () => {
        user.reset();
      },
      (msg) => {
        msg && message.error(msg);
      },
    );
  }, [onLogoutSubmit, user]);

  const menu = useMemo(() => {
    return (
      <Menu>
        {children}
        <Menu.Item key="logout" onClick={logout}>
          <LogoutOutlined />
          退出
        </Menu.Item>
      </Menu>
    );
  }, [children, logout]);

  if (!userinfo) {
    return null;
  }

  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <div className={styles['trigger']}>
        <Avatar src={userinfo.avatar} size="small" />
        <span className={styles['name']}>{userinfo.name}</span>
      </div>
    </Dropdown>
  );
};
