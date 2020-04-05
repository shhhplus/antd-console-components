import React from 'react';
import { SyncOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

export default ({ id, title, icon, onFresh, children }) => {
  const headerShown = !!title;
  return (
    <div id={id} className={styles['section']}>
      {headerShown && (
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
      )}

      <div className={styles['section-body']}>{children}</div>
    </div>
  );
};
