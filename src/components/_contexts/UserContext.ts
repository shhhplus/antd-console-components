import { createContext } from 'react';
import { UseUserResult } from '../types';

export default createContext<UseUserResult | null>(null);
