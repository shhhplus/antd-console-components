import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames/bind';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

export default ({
  opened = true,
  bordered = true,
  title,
  children,
  extra,
  onOpenedChange,
}) => {
  const [oped, setOped] = useState();

  const onChange = useCallback(() => {
    const newVal = !oped;
    if (onOpenedChange) {
      onOpenedChange(newVal);
    } else {
      setOped(newVal);
    }
  }, [oped, onOpenedChange]);

  useEffect(() => {
    setOped(opened);
  }, [opened]);

  return (
    <div
      className={cx(styles['spreader'], {
        closed: !oped,
        bordered: bordered,
      })}
    >
      <div className={styles['header']}>
        <div className={styles['title']} onClick={onChange}>
          {title}
          {oped ? (
            <CaretUpOutlined className={styles['icon']} />
          ) : (
            <CaretDownOutlined className={styles['icon']} />
          )}
        </div>
        <div>{extra}</div>
      </div>

      <div className={styles['content']}>{children}</div>
    </div>
  );
};
