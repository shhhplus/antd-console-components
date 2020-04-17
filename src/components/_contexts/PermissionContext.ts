import { createContext } from 'react';
import { UsePermissionResult } from '../_types';

export default createContext<UsePermissionResult | null>(null);
