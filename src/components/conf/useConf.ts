import { useContext } from 'react';
import { UseConfResult } from '../_types';
import { ConfContext } from '../contexts';

const useConf = (): UseConfResult => {
  const res = useContext(ConfContext);
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

export default useConf;
