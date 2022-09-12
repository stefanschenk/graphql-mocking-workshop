import { loader } from 'graphql.macro';

export const queries = {
  catalogArtistNames: loader('./query.artist-names.graphql'),
  catalogLandTypes: loader('./query.land-types.graphql'),
};
