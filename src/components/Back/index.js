import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

export default ({ text, onBack }) => {
  return (
    <span className={styles['back']} onClick={onBack}>
      <ArrowLeftOutlined className={styles['icon']} />
      {text || '返回'}
    </span>
  );
};
