import React, { ComponentType } from 'react';
// import { UseUserResult } from '../_types';
import useUser from './useUser';

// type HOC<InjectedProps> = <Props extends InjectedProps>(
//   Component: ComponentType<Props>,
// ) => ComponentType<Omit<Props, keyof InjectedProps>>;

// type Exclude<T, U> = T extends U ? never : T;
// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// interface InjectedProps {
//   user: UseUserResult;
// }

export default (Comp: ComponentType<any>) => {
  return (props: ComponentType<any>) => {
    const user = useUser();

    if (!user.data) {
      return null;
    }

    return <Comp {...props} user={user} />;
  };
};
