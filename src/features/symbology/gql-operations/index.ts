import { loader } from 'graphql.macro';

export const queries = {
  symbology: loader('./query.symbology.graphql'),
  symbologyParseMana: loader('./query.parse-mana.graphql'),
};
