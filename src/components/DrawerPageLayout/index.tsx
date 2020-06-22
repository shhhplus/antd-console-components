import React, { useMemo, ReactNode } from 'react';
import { PageHeader } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

interface Props {
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  extra?: ReactNode;
  fullfilled?: boolean;
  onFresh?: () => void;
  onBack?: () => void;
}

export default ({
  title,
  children,
  footer,
  extra,
  fullfilled,
  onFresh,
  onBack,
}: Props) => {
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
