import React from 'react';
import { Tooltip } from 'antd';
import styles from './index.module.scss';

export default ({ children, tooltip, placement = 'topLeft' }) => {
  const ele = <div className={styles['ellipsis']}>{children}</div>;

  if (tooltip) {
    return (
      <Tooltip title={children} placement={placement}>
        {ele}
      </Tooltip>
    );
  } else {
    return ele;
  }
};
