import React from 'react';
import styles from './index.module.scss';

export default ({
  label,
  value,
  labelWidth,
  spacing = '20px',
  marginBottom,
}) => {
  return (
    <div
      className={styles['fieldinfo']}
      style={{
        marginBottom,
      }}
    >
      <div
        className={styles['key']}
        style={{
          width: labelWidth,
          paddingRight: spacing,
        }}
      >
        {label}
      </div>
      <div className={styles['value']}>{value}</div>
    </div>
  );
};
