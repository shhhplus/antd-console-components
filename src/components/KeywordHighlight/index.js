import React, { Fragment } from 'react';

const split = (content, keyword) => {
  return content
    .split(keyword)
    .reduce((acc, cur, idx) => {
      if (idx === 0) {
        return [...acc, cur];
      }
      return [...acc, keyword, cur];
    }, [])
    .filter((text) => text.length);
};

const style = {
  color: '#00BC70',
};

export default ({ content, keyword }) => {
  if (typeof keyword !== 'string' || keyword.length === 0) {
    return content;
  }

  return (
    <Fragment>
      {split(content, keyword).map((text, idx) => {
        return (
          <Fragment key={idx}>
            {text === keyword ? <span style={style}>{text}</span> : text}
          </Fragment>
        );
      })}
    </Fragment>
  );
};
