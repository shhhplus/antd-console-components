import React, { useState, useEffect, useRef } from 'react';
import { Drawer } from 'antd';
import styles from './index.module.scss';

export default (props) => {
  const containerRef = useRef();
  const bodyOverflowRef = useRef(undefined);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  useEffect(() => {
    if (visible) {
      debugger;
      document.body.style.overflow = 'hidden';
    } else {
      if (bodyOverflowRef.current !== undefined) {
        debugger;
        document.body.style.overflow = bodyOverflowRef.current;
      }
    }
  }, [visible]);

  useEffect(() => {
    debugger;
    bodyOverflowRef.current = document.body.style.overflow;
  }, []);

  const { width = 900, onClose, ...rest } = props;

  return (
    <div ref={containerRef} className={styles['drawer']}>
      <Drawer
        {...rest}
        title={null}
        maskClosable={false}
        width={width}
        visible={visible}
        afterVisibleChange={setVisible}
        onClose={() => {
          setVisible(false);
          onClose && onClose();
        }}
        getContainer={() => containerRef.current}
      />
    </div>
  );
};
