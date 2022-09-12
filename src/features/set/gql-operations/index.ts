import { loader } from 'graphql.macro';

export const queries = {
  set: loader('./query.set-by-code.graphql'),
  setList: loader('./query.set-list.graphql'),
};
