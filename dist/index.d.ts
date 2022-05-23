import { Reducer, AnyAction } from 'redux';

interface AutoFunActionTypes<T = any> {
    (t: T): ActionType<T>;
    actionType: Symbol;
    type: string;
    parent: string;
}
interface ActionType<T = unknown> {
    type: Symbol;
    payload: T;
}
declare type AutoTypeAction<T> = {
    [key in keyof T]: T[key] extends Record<any, any> ? AutoTypeSonAction<T[key]> : AutoFunActionTypes<T[key]>;
};
declare type AutoTypeSonAction<T> = {
    [key in keyof T]: AutoFunActionTypes<T[key]>;
};
declare type StateRoot = {
    [key: string]: any;
};
interface InitReducersRespronse<T> {
    autoActions: AutoTypeAction<T>;
    reducers: Reducer<any, AnyAction>;
}
interface initReducerProps {
    <T extends StateRoot>(defaultState: T): InitReducersRespronse<T>;
}

declare const useReduxActions: <T>(action: AutoFunActionTypes<T>) => ((val: T) => void)[];

declare const useFetchAction: <T = unknown, U = any>(action: AutoFunActionTypes<U>, fetchAction: (...args: T[]) => Promise<U>, cb?: ((data: U | null, err?: Error | undefined) => void) | undefined) => ((...args: T[]) => void)[];

declare const useReduxState: <T>(action: AutoFunActionTypes<T>) => [T];

declare const useAutoRedux: <T>(action: AutoFunActionTypes<T>) => [T, (val: T) => void];

declare let autoActions: any;
declare const initReducers: initReducerProps;

export { autoActions, initReducers, useAutoRedux, useFetchAction, useReduxActions, useReduxState };
