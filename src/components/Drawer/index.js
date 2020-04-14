import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Drawer } from 'antd';
import styles from './index.module.scss';

export default (props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  const { width = 900, className, onClose, ...rest } = props;

  return (
    <Drawer
      {...rest}
      className={classNames(styles['drawer'], className)}
      maskClosable={false}
      width={width}
      visible={visible}
      title={null}
      onClose={() => {
        setVisible(false);
        onClose && onClose();
      }}
    />
  );
};
