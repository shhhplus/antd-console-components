import React from 'react';
import { SyncOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

export default ({ title, onFresh, extra }) => {
  if (!title) {
    return null;
  }

  return (
    <div className={styles['header']}>
      <div className={styles['title']}>
        {title}
        {onFresh && (
          <span
            className={styles['fresh']}
            onClick={() => {
              onFresh();
            }}
          >
            <SyncOutlined className={styles['icon']} />
          </span>
        )}
      </div>
      <div>{extra}</div>
    </div>
  );
};
