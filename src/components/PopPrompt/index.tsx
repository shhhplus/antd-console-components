import React, { ReactElement } from 'react';
import { Popover } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import styles from './index.module.scss';

type Placement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom'
  | undefined;

interface Props {
  title: ReactElement;
  desc: ReactElement;
  placement: Placement;
  children: ReactElement;
  actions: ReactElement | Array<ReactElement>;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  arrowPointAtCenter: boolean;
}

export default ({
  title,
  desc,
  placement,
  children,
  actions,
  visible,
  onVisibleChange,
  arrowPointAtCenter,
}: Props) => {
  const content = (
    <div className={styles['content']}>
      <ExclamationCircleFilled className={styles['icon']} />
      <div className={styles['title']}>{title}</div>
      <div className={styles['desc']}>{desc}</div>
      <div className={styles['actions']}>{actions}</div>
    </div>
  );

  return (
    <Popover
      content={content}
      placement={placement}
      trigger="click"
      arrowPointAtCenter={arrowPointAtCenter}
      visible={visible}
      onVisibleChange={onVisibleChange}
      overlayClassName={styles['pop']}
    >
      {children}
    </Popover>
  );
};
