import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeepPartial } from 'ts-essentials';
import { GqlSet, GqlSets } from '../../../src/graphql-schema.generated';

/**
 * Create a State object type
 * The information in this slice will be save in the Redux store under this key.
 * We want the data to be a certain GraphQL type, but we use DeepPartial, because for
 * the testdata setup we never have to provide all fields in a GraphQL response object.
 */
export type SetState = {
  sets: DeepPartial<GqlSets>;
};

/**
 * The initial state. You could make this an empty object {} and let our mock Apollo server
 * use it's default mock values when haven't created any testdata.
 * Or you could set it to empty list or string etc.
 */
const initialState: SetState = { sets: { data: [], total_cards: 0 } };

/**
 * Creation of the slice, using redux toolkit createSlice method.
 * Provide a name for the slice, an initialState and reducers.
 * Reducers are action which can be used with store.dispatch and an action payload must be
 * used is you want to add data to the state.
 * Redux toolkit makes it very easy to manipulate the state as you can see in the reducer functions.
 */
const slice = createSlice({
  name: 'set',
  initialState,
  reducers: {
    addSet: (state, action: PayloadAction<DeepPartial<GqlSet>>) => {
      state.sets.data.push(action.payload);
      state.sets.total_cards += 1;
    },
    addSets: (state, action: PayloadAction<DeepPartial<GqlSet>[]>) => {
      state.sets.data.push(...action.payload);
      state.sets.total_cards += action.payload.length;
    },
  },
  extraReducers: {},
});

/**
 * Export the reducers actions so they can be used in, for example, testcases
 */
export const { addSet, addSets } = slice.actions;

/**
 * Export the reduces to be added to the store reducer collection
 */
export const setReducer = slice.reducer;
