import React, { useMemo } from 'react';
import { PageHeader } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

export default ({
  title,
  onFresh,
  extra,
  children,
  footer,
  onBack,
  fullfilled,
}) => {
  const title2use = useMemo(() => {
    return (
      <div>
        {title}
        {onFresh && (
          <span className={styles['fresh']} onClick={onFresh}>
            <SyncOutlined className={styles['icon']} />
          </span>
        )}
      </div>
    );
  }, [title, onFresh]);
  return (
    <div className={styles['page']}>
      <PageHeader
        title={title2use}
        onBack={onBack}
        extra={extra}
        className={styles['header']}
      />
      <div className={styles['body']}>{children}</div>
      {footer && <div className={styles['footer']}>{footer}</div>}
    </div>
  );
};
