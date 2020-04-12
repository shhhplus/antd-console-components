import { useContext } from 'react';
import { UseUserResult } from '../_types';
import { UserContext } from '../contexts';

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
