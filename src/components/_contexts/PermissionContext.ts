import { createContext } from 'react';
import { UsePermissionResult } from '../types';

export default createContext<UsePermissionResult | null>(null);
