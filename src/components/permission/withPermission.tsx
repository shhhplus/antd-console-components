import React, { ComponentType } from 'react';
import usePermission from './usePermission';

export default (Comp: ComponentType<any>) => {
  return (props: ComponentType<any>) => {
    const permission = usePermission();

    if (!permission.data) {
      return null;
    }

    return <Comp {...props} permission={permission} />;
  };
};
