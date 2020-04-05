import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

export default ({ opened = true, title, children, extra }) => {
  const [oped, setOped] = useState();

  useEffect(() => {
    setOped(opened);
  }, [opened]);

  return (
    <div
      className={cx(styles['spreader'], {
        closed: !oped,
      })}
    >
      <div className={styles['header']}>
        <div className={styles['title']} onClick={() => setOped(!oped)}>
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
