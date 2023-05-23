/**
 * This file will be used in all assignments - it will contain all the code for your mock Apollo server
 */
import { ApolloServer } from '@apollo/server';
import { buildClientSchema } from 'graphql';
import { DeepPartial } from 'ts-essentials';
import { GqlCards, GqlCardSearchQueryVariables, GqlCatalogType, GqlSets } from '../src/graphql-schema.generated';
import { getCatalogLandTypes } from './store/catalogLandTypes/selectors';
import { getSearchResult } from './store/search/selectors';
import { getSetList } from './store/set/selectors';
import { TestDataStore } from './store/store';
import { addMocksToSchema } from '@graphql-tools/mock';

const introspectionResult = require('../graphql.schema.json');

const schema = buildClientSchema(introspectionResult);

/**
 * Resolver functions are passed four arguments: parent, args, context, and info (in that order).
 * @param store
 */
const resolvers = (store: TestDataStore) => ({
  Query: () => ({
    catalogLandTypes: (): DeepPartial<GqlCatalogType> => {
      return getCatalogLandTypes(store.getState());
    },
    cardSearch: (parent: unknown, args: GqlCardSearchQueryVariables): DeepPartial<GqlCards> => {
      return getSearchResult(store.getState()).filter(result => result.query === args.q)[0].result;
    },
    sets: (): DeepPartial<GqlSets> => {
      return getSetList(store.getState());
    },
  }),
});

export const apolloServer = (store: TestDataStore) =>
  new ApolloServer({
    schema: addMocksToSchema({
      schema,
      resolvers: () => ({
        Query: resolvers(store).Query(),
      }),
      preserveResolvers: false,
    }),
  });
