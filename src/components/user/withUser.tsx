import React, { ComponentType } from 'react';
import { UseUserResult } from '../types';
import useUser from './useUser';

interface CompProps {
  user: UseUserResult;
}

export default (Comp: ComponentType<CompProps>) => {
  const user = useUser();

  if (!user.data) {
    return null;
  }

  return user.data ? <Comp user={user} /> : null;
};
