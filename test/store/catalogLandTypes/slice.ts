import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GqlCatalogType } from '../../../src/graphql-schema.generated';
import { DeepPartial } from 'ts-essentials';

/**
 * Create a State object type
 * The information in this slice will be save in the Redux store under this key.
 * We want the data to be a certain GraphQL type, but we use DeepPartial, because for
 * the testdata setup we never have to provide all fields in a GraphQL response object.
 */
export type CatalogLandTypesState = {
  catalogLandTypes: DeepPartial<GqlCatalogType>;
};

/**
 * The initial state. You could make this an empty object {} and let our mock Apollo server
 * use its default mock values when haven't created any testdata.
 * Or you could set it to empty list or string etc.
 */
const initialState: CatalogLandTypesState = {
  catalogLandTypes: { total_values: 0, data: [] },
};

/**
 * Creation of the slice, using redux toolkit createSlice method.
 * Provide a name for the slice, an initialState and reducers.
 * Reducers are action which can be used with store.dispatch and an action payload must be
 * used is you want to add data to the state.
 * Redux toolkit makes it very easy to manipulate the state as you can see in the reducer functions.
 */
const slice = createSlice({
  name: 'catalogLandTypes',
  initialState,
  reducers: {
    addLandTypes: (state, action: PayloadAction<string[]>) => {
      state.catalogLandTypes.data.push(...action.payload);
      state.catalogLandTypes.total_values += action.payload.length;
    },
    removeLandTypes: (state, action: PayloadAction<string[]>) => {
      state.catalogLandTypes.data = state.catalogLandTypes.data.filter(landType => !action.payload.includes(landType));
      state.catalogLandTypes.total_values -= action.payload.length;
    },
  },
  extraReducers: {},
});

/**
 * Export the reducers actions so they can be used in, for example, testcases
 */
export const { addLandTypes, removeLandTypes } = slice.actions;

/**
 * Export the reduces to be added to the store reducer collection
 */
export const catalogLandTypesReducer = slice.reducer;
