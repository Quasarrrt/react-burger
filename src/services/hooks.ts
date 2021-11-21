import {TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook} from 'react-redux';
import {AppDispatch, AppThunk, RootState} from "./store";

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>()
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook

