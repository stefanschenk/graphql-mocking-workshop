import { AnyAction, configureStore, Dispatch, EnhancedStore, Middleware } from '@reduxjs/toolkit';
import { ThunkMiddleware } from 'redux-thunk';
import { catalogLandTypesReducer } from './catalogLandTypes/slice';
import { searchResultReducer } from './search/slice';

/**
 * The Redux store, which is created by using configureStore
 * The options object must contain a collection of reducers. When you create a new slice and reducer
 * add the reducer to this configuration to be able to use it.
 */
export const store = configureStore({
  reducer: {
    catalogLandTypes: catalogLandTypesReducer,
    searchResult: searchResultReducer,
  },
});

/**
 * A type is created, which can be used when you want to use the store as parameter in a function
 */
export type TestDataStore = EnhancedStore<
  any,
  any,
  (
    | Middleware<unknown, any, Dispatch<AnyAction>>
    | ThunkMiddleware<any, AnyAction, null>
    | ThunkMiddleware<any, AnyAction, undefined>
  )[]
>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
