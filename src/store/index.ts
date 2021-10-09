import {Action, applyMiddleware, compose, createStore} from 'redux';
import {routerMiddleware} from 'connected-react-router';

import {createBrowserHistory} from 'history';
import createRootReducer from './createRootReducer';
import {createLogger} from 'redux-logger';
import thunk, {ThunkAction} from 'redux-thunk';


const logger = createLogger({collapsed: true});
const middlewares = [thunk, logger];
// @ts-ignore
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;


export const history = createBrowserHistory({basename: process.env.PUBLIC_URL});
const rootReducer = createRootReducer(history);
export const store = createStore(
    rootReducer,
    {} as any,
    composeEnhancers(applyMiddleware(routerMiddleware(history), ...middlewares))
);

export type AppRootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, AppRootState, null, Action<string>>;