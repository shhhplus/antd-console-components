import React, { useState, useEffect, useRef } from 'react';
import { Drawer } from 'antd';
import styles from './index.module.scss';

export default (props) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  const { width = 900, onClose, ...rest } = props;

  return (
    <div ref={ref} className={styles['drawer']}>
      <Drawer
        {...rest}
        maskClosable={false}
        width={width}
        visible={visible}
        title={null}
        onClose={() => {
          setVisible(false);
          onClose && onClose();
        }}
        getContainer={() => {
          return ref.current;
        }}
      />
    </div>
  );
};
