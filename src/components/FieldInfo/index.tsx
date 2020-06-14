import React, { ReactNode, ReactElement } from 'react';
import FieldInfoList from './FieldInfoList';
import styles from './index.module.scss';

interface Props {
  label: ReactElement | string;
  value: ReactNode;
  labelWidth?: number | string;
  spacing?: number | string;
  marginBottom?: number | string;
}

const FieldInfo = ({
  label,
  value,
  labelWidth,
  spacing = '20px',
  marginBottom = 0,
}: Props) => {
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

FieldInfo.FieldInfoList = FieldInfoList;

export default FieldInfo;
