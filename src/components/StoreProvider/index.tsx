import React, { useState, ReactElement, useMemo, useEffect } from 'react';
import StoreContext from './StoreContext';
import useStore from './useStore';
import withStore from './withStore';

interface Props {
  initialState: any;
  children: ReactElement;
}

const StoreProvider = ({ children, initialState }: Props) => {
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

StoreProvider.useStore = useStore;
StoreProvider.withStore = withStore;

export default StoreProvider;
