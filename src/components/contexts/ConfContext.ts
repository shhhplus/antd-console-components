import { createContext } from 'react';
import { UseConfResult } from '../_types';

export default createContext<UseConfResult | null>(null);
