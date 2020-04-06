interface Userinfo {
  id: string | number;
  name: string;
  avatar: string;
}

export type User = Userinfo | null | undefined;

export type GetUser = () => Promise<User>;

export interface UseFetchResult {
  data: any;
  fetching: boolean;
  fetch: () => void;
}

export interface UseUserResult extends UseFetchResult {
  data: User;
}