// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import type { RootState } from '@/redux/store'; // або вкажи правильний шлях до store.ts

// export const useAppDispatch = () => useDispatch();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store'; // переконайся, що AppDispatch теж є в store.ts

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
