import React, { ReactNode } from 'react';
import styles from './index.module.scss';

interface Props {
  header?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
}

export default ({ header, children, footer }: Props) => {
  return (
    <div className={styles['page']}>
      <div className={styles['header']}>{header}</div>
      <div className={styles['body']}>{children}</div>
      <div className={styles['footer']}>{footer}</div>
    </div>
  );
};
