import React, { useMemo, useCallback } from 'react';
import { Dropdown, Menu, Avatar, message } from 'antd';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Userinfo } from '../../types';
import styles from './index.module.scss';

interface Props {
  userinfo: Userinfo;
  onLogoutSubmit: () => Promise<void>;
  onLogoutSuccess: () => void;
}

export default ({ userinfo, onLogoutSubmit, onLogoutSuccess }: Props) => {
  const logout = useCallback(() => {
    onLogoutSubmit().then(onLogoutSuccess, (msg) => {
      msg && message.error(msg);
    });
  }, [onLogoutSubmit, onLogoutSuccess]);

  const menu = useMemo(() => {
    return (
      <Menu>
        <Menu.Item key="uc">
          <UserOutlined />
          个人中心
        </Menu.Item>
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" onClick={logout}>
          <LogoutOutlined />
          退出
        </Menu.Item>
      </Menu>
    );
  }, [logout]);

  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <div className={styles['trigger']}>
        <Avatar src={userinfo.avatar} size="small" />
        <span className={styles['name']}>{userinfo.name}</span>
      </div>
    </Dropdown>
  );
};
