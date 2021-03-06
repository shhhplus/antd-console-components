export interface Userinfo {
  id: string | number;
  name: string;
  avatar: string;
}

export type GetUser = () => Promise<Userinfo | null | undefined>;

export interface UseFetchResult {
  data: any;
  fetching: boolean;
  fetch: () => void;
  reset: () => void;
}

export interface UseUserResult extends UseFetchResult {
  data: Userinfo | null | undefined;
}

export interface UsePermissionResult extends UseFetchResult {}

export interface Store {
  state: any;
  setState: (state: any) => void;
}
