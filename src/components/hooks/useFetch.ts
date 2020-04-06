import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { UseFetchResult } from '../types';

export default (fn: () => Promise<any>): UseFetchResult => {
  const [data, setData] = useState<any>(null);
  const [fetching, setFetching] = useState(false);
  const fetchingRef = useRef<boolean>(false);

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
    };
  }, [data, fetching, fetch]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return res;
};
