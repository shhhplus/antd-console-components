import { useState, useEffect, useMemo, useCallback } from 'react';
import { UseFetchResult } from '../types';

export default (fn: () => Promise<any>): UseFetchResult => {
  const [data, setData] = useState<any>(null);
  const [fetching, setFetching] = useState(false);

  const fetch = useCallback(() => {
    if (!fn) {
      return;
    }

    if (fetching) {
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
