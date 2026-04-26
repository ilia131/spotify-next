'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

interface CustomProviderProps {
  children: ReactNode;
}

export default function CustomProvider({ children }: CustomProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}