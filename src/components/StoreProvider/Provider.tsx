import React, { useState, ReactElement, useMemo, useEffect } from 'react';
import StoreContext from './StoreContext';

interface Props {
  initialState: any;
  children: ReactElement;
}

export default ({ children, initialState }: Props) => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    setState(initialState);
  }, [initialState]);

  const store = useMemo(() => {
    return {
      state,
      setState,
    };
  }, [state]);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
