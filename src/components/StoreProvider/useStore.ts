import { useContext } from 'react';
import { Store } from '../types';
import StoreContext from './StoreContext';

export default (): Store => {
  const res = useContext(StoreContext);
  if (res) {
    return res;
  } else {
    return {
      state: null,
      setState: (state) => {},
    };
  }
};
