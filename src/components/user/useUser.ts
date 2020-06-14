import { useContext } from 'react';
import { UseUserResult } from '../types';
import { UserContext } from '../_contexts';

const useUser = (): UseUserResult => {
  const res = useContext(UserContext);
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

export default useUser;
