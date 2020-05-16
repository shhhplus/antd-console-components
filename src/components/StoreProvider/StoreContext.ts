import { createContext } from 'react';
import { Store } from '../_types';

export default createContext<Store | null>(null);
