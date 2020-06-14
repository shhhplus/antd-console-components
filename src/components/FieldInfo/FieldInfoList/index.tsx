import React, { Fragment } from 'react';
import FieldInfoItem from '..';

interface Props {
  infos: Array<any>;
  labelWidth?: number | string;
  spacing?: number | string;
  marginBottom?: number | string;
}

export default ({ infos, labelWidth, spacing, marginBottom }: Props) => {
  return (
    <Fragment>
      {infos.map(({ label, value }, idx) => {
        return (
          <FieldInfoItem
            key={idx}
            labelWidth={labelWidth}
            spacing={spacing}
            marginBottom={idx !== infos.length - 1 ? marginBottom : 0}
            label={label}
            value={value}
          />
        );
      })}
    </Fragment>
  );
};
