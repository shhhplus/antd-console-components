import React, { ComponentType } from 'react';
import useConf from './useConf';

export default (Comp: ComponentType<any>) => {
  return (props: ComponentType<any>) => {
    const conf = useConf();

    if (!conf.data) {
      return null;
    }

    return <Comp {...props} conf={conf} />;
  };
};
