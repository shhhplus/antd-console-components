import { useState, useEffect, useMemo } from 'react';
import { GetUser, UseUserResult } from '../types';
import { useFetch } from '../hooks';

let _setGetUser: (gu: GetUser) => void;

const useUser = (fn: GetUser | undefined | null): UseUserResult => {
  const [getUser, setGetUser] = useState<GetUser | undefined | null>();

  useEffect(() => {
    _setGetUser = setGetUser;
  }, []);

  useEffect(() => {
    setGetUser(() => fn);
  }, [fn]);

  const getUser2use = useMemo(() => {
    return getUser ? getUser : () => Promise.resolve(null);
  }, [getUser]);

  return useFetch(getUser2use);
};

useUser.init = (gu: GetUser) => {
  _setGetUser(gu);
};

export default useUser;
