import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import classNames from 'classnames/bind';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

interface Props {
  opened?: boolean;
  bordered?: boolean;
  title: ReactNode;
  children?: ReactNode;
  extra?: ReactNode;
  onOpenedChange?: (opened: boolean) => void;
}

export default ({
  opened = true,
  bordered = true,
  title,
  children,
  extra,
  onOpenedChange,
}: Props) => {
  const [oped, setOped] = useState<boolean>(false);

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
