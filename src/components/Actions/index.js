import React, { Fragment } from 'react';
import classNames from 'classnames/bind';
import flattenDeep from 'lodash/flatMapDeep';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

// 全局配置
let _spacing = 10;

function isReactFragment(ele) {
  if (ele.type) {
    return ele.type === React.Fragment;
  }
  return ele === React.Fragment;
}

// 将children拍平(Fragment)
const flatten = (children) => {
  const list = React.Children.toArray(children)
    .filter((child) => !!child)
    .map((child) => {
      if (!isReactFragment(child)) {
        return [child];
      }
      return flatten(child.props.children);
    });

  return flattenDeep(list);
};

const Actions = ({ children, spacing = _spacing }) => {
  const className = cx('action');
  const actions = flatten(children);
  return (
    <Fragment>
      {actions.map((ele, idx) => {
        if (typeof ele.type === 'function') {
          return (
            <span
              key={idx}
              className={className}
              style={
                idx < actions.length - 1
                  ? {
                      marginRight: spacing,
                    }
                  : null
              }
            >
              {ele}
            </span>
          );
        } else {
          return (
            <Fragment key={idx}>
              {React.cloneElement(ele, {
                key: idx,
                className: className,
                style:
                  idx < actions.length - 1
                    ? {
                        ...ele.style,
                        marginRight: spacing,
                      }
                    : ele.style,
              })}
            </Fragment>
          );
        }
      })}
    </Fragment>
  );
};

Actions.config = ({ spacing = _spacing }) => {
  _spacing = spacing;
};

export default Actions;
