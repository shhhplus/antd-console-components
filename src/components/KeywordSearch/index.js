import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

export default ({
  left,
  value,
  onChange,
  onSubmit,
  placeholder = '请输入关键字搜索',
}) => {
  const [val, setVal] = useState(value);

  useEffect(() => {
    setVal(value);
  }, [value]);

  return (
    <div className={styles['container']}>
      <div>{left}</div>
      <Input
        value={val}
        onChange={(e) => {
          const value = e.target.value;
          setVal(value);
          onChange && onChange(value);
        }}
        placeholder={placeholder}
        onPressEnter={(e) => {
          onSubmit(val);
        }}
        prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
      />
    </div>
  );
};
