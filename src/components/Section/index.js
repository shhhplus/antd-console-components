import React, { useMemo } from 'react';
import { Card } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

export default ({ id, title, icon, onFresh, ...rest }) => {
  const title2use = useMemo(() => {
    if (!title) {
      return null;
    }

    return (
      <div className={styles['section-header']}>
        {icon && <span className={styles['section-icon']}>{icon}</span>}
        {title}
        {onFresh && (
          <span
            className={styles['section-fresh']}
            onClick={() => {
              onFresh();
            }}
          >
            <SyncOutlined className={styles['section-fresh-icon']} />
          </span>
        )}
      </div>
    );
  }, [title, icon, onFresh]);

  return (
    <Card id={id} className={styles['section']} title={title2use} {...rest} />
  );
};
