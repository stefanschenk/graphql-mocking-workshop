import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

/**
 * Take a part of the store to be used in selectors.
 * @param state
 */
const selectCatalogLandTypesSlice = (state: RootState) => state.catalogLandTypes;

/**
 * Create a selector with createSelector. It takes a slice or multiple slices [slice1, slice2, ..., slicen]
 * and passes the results of those slices to a callback function. This function should have a parameter for each slice.
 * In the callback function you can manipulate data from the store or combine data from multiple slices before returning it
 * to the calling function.
 * Selectors can be called directly from other functions and require the current state as parameter
 * e.g. getCatalogLandTypes(store.getState())
 */
export const getCatalogLandTypes = createSelector(selectCatalogLandTypesSlice, catalogLandTypes => {
  return catalogLandTypes.catalogLandTypes;
});
