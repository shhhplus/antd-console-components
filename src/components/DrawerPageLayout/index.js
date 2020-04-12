import React from 'react';
import classNames from 'classnames/bind';
import Back from '../Back';
import PageTitle from '../PageTitle';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

export default ({
  title,
  onFresh,
  extra,
  children,
  onBack,
  anchor,
  fullfilled,
}) => {
  return (
    <div
      className={cx({
        'page-fullfilled': fullfilled,
      })}
    >
      {onBack && (
        <div>
          <Back onBack={onBack} />
        </div>
      )}
      <PageTitle title={title} onFresh={onFresh} extra={extra} />
      <div className={styles['page-body']}>
        <div className={styles['page-left']}>{children}</div>
        {anchor && <div className={styles['page-right']}>{anchor}</div>}
      </div>
    </div>
  );
};
