import { useContext } from 'react';
import { UsePermissionResult } from '../_types';
import { PermissionContext } from '../_contexts';

const usePermission = (): UsePermissionResult => {
  const res = useContext(PermissionContext);
  if (res) {
    return res;
  } else {
    return {
      data: null,
      fetching: false,
      fetch: () => {},
      reset: () => {},
    };
  }
};

export default usePermission;
