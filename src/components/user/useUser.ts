import { useState, useEffect } from 'react';
import { User, UseUserResult } from '../types';
import { useFetch } from '../hooks';

type GetUser = () => Promise<User>;

let _setGetUser: (gu: GetUser) => void;

const useUser = (): UseUserResult => {
  const [getUser, setGetUser] = useState<GetUser>(() =>
    Promise.resolve(undefined),
  );

  useEffect(() => {
    _setGetUser = setGetUser;
  }, []);

  return useFetch(getUser);
};

useUser.init = (gu: GetUser) => {
  _setGetUser(gu);
};

export default useUser;
