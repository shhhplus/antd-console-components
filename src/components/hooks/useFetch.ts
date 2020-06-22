import { useState, useMemo, useCallback, useRef } from 'react';
import { UseFetchResult } from '../types';

const _InitialData = null;

export default (fn: () => Promise<any>): UseFetchResult => {
  const [data, setData] = useState<any>(_InitialData);
  const [fetching, setFetching] = useState(false);
  const fetchingRef = useRef<boolean>(false);
  const reset = useCallback(() => {
    setData(_InitialData);
  }, []);

  const fetch = useCallback(() => {
    if (!fn) {
      return;
    }

    if (fetchingRef.current) {
      return;
    }
    setFetching(true);

    fn()
      .then((res) => {
        setData(res);
      })
      .finally(() => {
        setFetching(false);
      });
  }, [fn]);

  const res = useMemo(() => {
    return {
      data,
      fetching,
      fetch,
      reset,
    };
  }, [data, fetching, fetch, reset]);

  return res;
};
