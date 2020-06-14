import React, { useState, useEffect, ComponentType } from 'react';
import classNames from 'classnames';
import { Drawer } from 'antd';
import { DrawerProps } from 'antd/lib/drawer';
import styles from './index.module.scss';

interface Props extends DrawerProps {
  onClose: () => void;
}

const EnhancedDrawer: ComponentType<Props> = ({
  visible = false,
  width = 900,
  className,
  onClose,
  ...rest
}: Props) => {
  const [visible2use, setVisible2use] = useState(false);

  useEffect(() => {
    setVisible2use(visible);
  }, [visible]);

  return (
    <Drawer
      {...rest}
      className={classNames(styles['drawer'], className)}
      title={null}
      maskClosable={false}
      width={width}
      visible={visible2use}
      onClose={() => {
        setVisible2use(false);
        onClose && onClose();
      }}
    />
  );
};

export default EnhancedDrawer;
