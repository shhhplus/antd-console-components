import { createContext } from 'react';
import { Store } from '../types';

export default createContext<Store | null>(null);
