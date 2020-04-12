import { createContext } from 'react';
import { UseUserResult } from '../_types';

export default createContext<UseUserResult | null>(null);
