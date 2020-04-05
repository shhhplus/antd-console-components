import React, { Fragment } from 'react';
import FieldInfoItem from '../FieldInfoItem';

export default ({ infos = [], labelWidth, marginBottom }) => {
  return (
    <Fragment>
      {infos.map(({ label, value }, idx) => {
        return (
          <FieldInfoItem
            key={idx}
            labelWidth={labelWidth}
            marginBottom={idx !== infos.length - 1 ? marginBottom : 0}
            label={label}
            value={value}
          />
        );
      })}
    </Fragment>
  );
};
