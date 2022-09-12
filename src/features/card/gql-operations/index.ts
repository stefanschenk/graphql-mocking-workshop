import { loader } from 'graphql.macro';

export const queries = {
  cardRandom: loader('./query.random.graphql'),
  cardSearch: loader('./query.search.graphql'),
};
