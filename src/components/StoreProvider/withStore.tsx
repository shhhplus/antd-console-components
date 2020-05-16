import React, { ComponentType } from 'react';
import useStore from './useStore';

export default (Comp: ComponentType<any>) => {
  return (props: ComponentType<any>) => {
    const store = useStore();

    return <Comp {...props} store={store} />;
  };
};
