import React from 'react';
import { Spin } from 'antd';
import styles from './index.module.scss';

export default () => {
  return (
    <div className={styles.bg}>
      <div className={styles.main}>
        <Spin spinning={true} tip="系统正在初始化">
          <div style={{ height: '300px' }}></div>
        </Spin>
      </div>
    </div>
  );
};
