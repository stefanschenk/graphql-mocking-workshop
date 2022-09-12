import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum GqlCacheControlScope {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC'
}

export type GqlCard = {
  artist: Scalars['String'];
  artist_ids: Array<Scalars['String']>;
  booster: Scalars['Boolean'];
  border_color: Scalars['String'];
  card_back_id: Maybe<Scalars['String']>;
  cardmarket_id: Maybe<Scalars['Int']>;
  cmc: Scalars['Int'];
  collector_number: Scalars['String'];
  color_identity: Array<Maybe<GqlColor>>;
  colors: Array<Maybe<GqlColor>>;
  digital: Scalars['Boolean'];
  edhrec_rank: Maybe<Scalars['Int']>;
  finishes: Array<Scalars['String']>;
  flavor_text: Maybe<Scalars['String']>;
  foil: Scalars['Boolean'];
  frame: Scalars['String'];
  frame_effects: Maybe<Array<Maybe<Scalars['String']>>>;
  full_art: Scalars['Boolean'];
  games: Array<Scalars['String']>;
  highres_image: Scalars['Boolean'];
  id: Scalars['String'];
  illustration_id: Scalars['String'];
  image_status: Scalars['String'];
  image_uris: GqlImageUris;
  keywords: Array<Maybe<Scalars['String']>>;
  lang: Scalars['String'];
  layout: Scalars['String'];
  legalities: GqlLegalities;
  mana_cost: Maybe<Scalars['String']>;
  multiverse_ids: Array<Maybe<Scalars['String']>>;
  name: Scalars['String'];
  nonfoil: Scalars['Boolean'];
  object: Scalars['String'];
  oracle_id: Scalars['String'];
  oracle_text: Maybe<Scalars['String']>;
  oversized: Scalars['Boolean'];
  power: Maybe<Scalars['String']>;
  preview: Maybe<GqlPreview>;
  prices: GqlPrices;
  prints_search_uri: Scalars['String'];
  promo: Scalars['Boolean'];
  purchase_uris: Maybe<GqlPurchaseUris>;
  rarity: GqlRarity;
  related_uris: Maybe<GqlRelatedUris>;
  released_at: Scalars['String'];
  reprint: Scalars['Boolean'];
  reserved: Scalars['Boolean'];
  rulings_uri: Scalars['String'];
  scryfall_set_uri: Scalars['String'];
  scryfall_uri: Scalars['String'];
  set: Scalars['String'];
  set_id: Scalars['String'];
  set_name: Scalars['String'];
  set_search_uri: Scalars['String'];
  set_type: Scalars['String'];
  set_uri: Scalars['String'];
  story_spotlight: Scalars['Boolean'];
  tcgplayer_id: Maybe<Scalars['Int']>;
  textless: Scalars['Boolean'];
  toughness: Maybe<Scalars['String']>;
  type_line: Scalars['String'];
  uri: Scalars['String'];
  variation: Scalars['Boolean'];
};

export type GqlCardSymbol = {
  appears_in_mana_costs: Scalars['Boolean'];
  cmc: Maybe<Scalars['Float']>;
  colors: Array<Maybe<GqlColor>>;
  english: Scalars['String'];
  funny: Scalars['Boolean'];
  gatherer_alternates: Maybe<Array<Maybe<Scalars['String']>>>;
  loose_variant: Maybe<Scalars['String']>;
  object: Scalars['String'];
  represents_mana: Scalars['Boolean'];
  svg_uri: Scalars['String'];
  symbol: Scalars['String'];
  transposable: Scalars['Boolean'];
};

export type GqlCards = GqlList & {
  data: Array<GqlCard>;
  has_more: Scalars['Boolean'];
  next_page: Maybe<Scalars['String']>;
  total_cards: Maybe<Scalars['Int']>;
  warnings: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GqlCatalogType = {
  data: Array<Scalars['String']>;
  object: Scalars['String'];
  total_values: Scalars['String'];
  uri: Scalars['String'];
};

export enum GqlColor {
  B = 'B',
  G = 'G',
  R = 'R',
  U = 'U',
  W = 'W'
}

export type GqlImageUris = {
  art_crop: Maybe<Scalars['String']>;
  border_crop: Maybe<Scalars['String']>;
  large: Maybe<Scalars['String']>;
  normal: Maybe<Scalars['String']>;
  png: Maybe<Scalars['String']>;
  small: Maybe<Scalars['String']>;
};

export type GqlLegalities = {
  alchemy: GqlLegality;
  brawl: GqlLegality;
  commander: GqlLegality;
  duel: GqlLegality;
  explorer: GqlLegality;
  future: GqlLegality;
  gladiator: GqlLegality;
  historic: GqlLegality;
  historicbrawl: GqlLegality;
  legacy: GqlLegality;
  modern: GqlLegality;
  oldschool: GqlLegality;
  pauper: GqlLegality;
  paupercommander: GqlLegality;
  penny: GqlLegality;
  pioneer: GqlLegality;
  premodern: GqlLegality;
  standard: GqlLegality;
  vintage: GqlLegality;
};

export enum GqlLegality {
  BANNED = 'BANNED',
  LEGAL = 'LEGAL',
  NOT_LEGAL = 'NOT_LEGAL',
  RESTRICTED = 'RESTRICTED'
}

export type GqlList = {
  has_more: Scalars['Boolean'];
  next_page: Maybe<Scalars['String']>;
  total_cards: Maybe<Scalars['Int']>;
  warnings: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GqlPreview = {
  previewed_at: Maybe<Scalars['String']>;
  source: Scalars['String'];
  source_uri: Maybe<Scalars['String']>;
};

export type GqlPrices = {
  eur: Maybe<Scalars['String']>;
  eur_foil: Maybe<Scalars['String']>;
  tix: Maybe<Scalars['String']>;
  usd: Maybe<Scalars['String']>;
  usd_etched: Maybe<Scalars['String']>;
  usd_foil: Maybe<Scalars['String']>;
};

export type GqlPurchaseUris = {
  cardhoarder: Maybe<Scalars['String']>;
  cardmarket: Maybe<Scalars['String']>;
  tcgplayer: Maybe<Scalars['String']>;
};

export type GqlQuery = {
  cardRandom: GqlCard;
  cardSearch: GqlCards;
  catalogArtistNames: GqlCatalogType;
  catalogCardNames: GqlCatalogType;
  catalogLandTypes: GqlCatalogType;
  releaseInfo: GqlReleaseInfo;
  setByCode: GqlSet;
  setById: GqlSet;
  sets: GqlSets;
  symbology: GqlSymbology;
  symbologyParseMana: GqlSymbologyParseManaType;
};


export type GqlQueryCardSearchArgs = {
  q: Scalars['String'];
  unique?: InputMaybe<Scalars['String']>;
};


export type GqlQuerySetByCodeArgs = {
  code: Scalars['String'];
};


export type GqlQuerySetByIdArgs = {
  id: Scalars['String'];
};


export type GqlQuerySymbologyParseManaArgs = {
  cost: Scalars['String'];
};

export enum GqlRarity {
  COMMON = 'COMMON',
  MYTHIC = 'MYTHIC',
  RARE = 'RARE',
  UNCOMMON = 'UNCOMMON'
}

export type GqlRelatedUris = {
  edhrec: Maybe<Scalars['String']>;
  gatherer: Maybe<Scalars['String']>;
  tcgplayer_infinite_articles: Maybe<Scalars['String']>;
  tcgplayer_infinite_decks: Maybe<Scalars['String']>;
};

export type GqlReleaseInfo = {
  description: Scalars['String'];
  name: Scalars['String'];
  version: Scalars['String'];
};

export type GqlSet = {
  block: Maybe<Scalars['String']>;
  block_code: Maybe<Scalars['String']>;
  card_count: Scalars['Int'];
  code: Scalars['String'];
  digital: Scalars['Boolean'];
  foil_only: Scalars['Boolean'];
  icon_svg_uri: Scalars['String'];
  id: Scalars['String'];
  mtgo_code: Maybe<Scalars['String']>;
  name: Scalars['String'];
  nonfoil_only: Scalars['Boolean'];
  parent_set_code: Maybe<Scalars['String']>;
  printed_size: Maybe<Scalars['Int']>;
  released_at: Maybe<Scalars['String']>;
  scryfall_uri: Scalars['String'];
  search_uri: Scalars['String'];
  set_type: Scalars['String'];
  tcgplayer_id: Maybe<Scalars['Int']>;
  uri: Scalars['String'];
};

export enum GqlSetType {
  ALCHEMY = 'alchemy',
  ARCHENEMY = 'archenemy',
  ARSENAL = 'arsenal',
  BOX = 'box',
  COMMANDER = 'commander',
  CORE = 'core',
  DRAFT_INNOVATION = 'draft_innovation',
  DUEL_DECK = 'duel_deck',
  EXPANSION = 'expansion',
  FROM_THE_VAULT = 'from_the_vault',
  FUNNY = 'funny',
  MASTERPIECE = 'masterpiece',
  MASTERS = 'masters',
  MEMORABILIA = 'memorabilia',
  PLANECHASE = 'planechase',
  PREMIUM_DECK = 'premium_deck',
  PROMO = 'promo',
  SPELLBOOK = 'spellbook',
  STARTER = 'starter',
  TOKEN = 'token',
  TREASURE_CHEST = 'treasure_chest',
  VANGUARD = 'vanguard'
}

export type GqlSets = GqlList & {
  data: Array<GqlSet>;
  has_more: Scalars['Boolean'];
  next_page: Maybe<Scalars['String']>;
  total_cards: Maybe<Scalars['Int']>;
  warnings: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GqlSymbology = {
  data: Array<GqlCardSymbol>;
  has_more: Scalars['Boolean'];
  object: Scalars['String'];
};

export type GqlSymbologyParseManaType = {
  cmc: Scalars['Float'];
  colorless: Scalars['Boolean'];
  colors: Array<Maybe<GqlColor>>;
  cost: Scalars['String'];
  monocolored: Scalars['Boolean'];
  multicolored: Scalars['Boolean'];
  object: Scalars['String'];
};

export type GqlCardRandomQueryVariables = Exact<{ [key: string]: never; }>;


export type GqlCardRandomQuery = { cardRandom: { object: string, id: string, oracle_id: string, multiverse_ids: Array<string | null>, tcgplayer_id: number | null, cardmarket_id: number | null, name: string, lang: string, released_at: string, uri: string, scryfall_uri: string, layout: string, highres_image: boolean, image_status: string, mana_cost: string | null, cmc: number, power: string | null, toughness: string | null, type_line: string, oracle_text: string | null, colors: Array<GqlColor | null>, color_identity: Array<GqlColor | null>, keywords: Array<string | null>, games: Array<string>, reserved: boolean, foil: boolean, nonfoil: boolean, finishes: Array<string>, oversized: boolean, promo: boolean, reprint: boolean, variation: boolean, set_id: string, set: string, set_name: string, set_type: string, set_uri: string, set_search_uri: string, scryfall_set_uri: string, rulings_uri: string, prints_search_uri: string, collector_number: string, digital: boolean, rarity: GqlRarity, flavor_text: string | null, card_back_id: string | null, artist: string, artist_ids: Array<string>, illustration_id: string, border_color: string, frame: string, frame_effects: Array<string | null> | null, full_art: boolean, textless: boolean, booster: boolean, story_spotlight: boolean, edhrec_rank: number | null, legalities: { standard: GqlLegality, alchemy: GqlLegality, pioneer: GqlLegality, explorer: GqlLegality, modern: GqlLegality, brawl: GqlLegality, legacy: GqlLegality, historic: GqlLegality, vintage: GqlLegality, pauper: GqlLegality, commander: GqlLegality, penny: GqlLegality }, image_uris: { normal: string | null }, prices: { eur: string | null, eur_foil: string | null } } };

export type GqlCardSearchQueryVariables = Exact<{
  q: Scalars['String'];
  unique?: InputMaybe<Scalars['String']>;
}>;


export type GqlCardSearchQuery = { cardSearch: { has_more: boolean, data: Array<{ name: string, mana_cost: string | null, type_line: string, oracle_text: string | null, flavor_text: string | null, power: string | null, toughness: string | null, image_uris: { normal: string | null } }> } };

export type GqlCatalogArtistNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GqlCatalogArtistNamesQuery = { catalogArtistNames: { total_values: string, data: Array<string> } };

export type GqlCatalogLandTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GqlCatalogLandTypesQuery = { catalogLandTypes: { object: string, uri: string, total_values: string, data: Array<string> } };

export type GqlSetByCodeQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type GqlSetByCodeQuery = { setByCode: { id: string, code: string, mtgo_code: string | null, tcgplayer_id: number | null, name: string, set_type: string, released_at: string | null, block_code: string | null, block: string | null, parent_set_code: string | null, card_count: number, printed_size: number | null, digital: boolean, foil_only: boolean, nonfoil_only: boolean, scryfall_uri: string, uri: string, icon_svg_uri: string, search_uri: string } };

export type GqlSetListQueryVariables = Exact<{ [key: string]: never; }>;


export type GqlSetListQuery = { sets: { data: Array<{ code: string, name: string, card_count: number, set_type: string, icon_svg_uri: string, released_at: string | null }> } };

export type GqlSymbologyParseManaQueryVariables = Exact<{
  cost: Scalars['String'];
}>;


export type GqlSymbologyParseManaQuery = { symbologyParseMana: { cost: string, cmc: number, colors: Array<GqlColor | null>, colorless: boolean, monocolored: boolean, multicolored: boolean } };

export type GqlSymbologyQueryVariables = Exact<{ [key: string]: never; }>;


export type GqlSymbologyQuery = { symbology: { object: string, has_more: boolean, data: Array<{ object: string, symbol: string, svg_uri: string, loose_variant: string | null, english: string, transposable: boolean, represents_mana: boolean, appears_in_mana_costs: boolean, cmc: number | null, funny: boolean, colors: Array<GqlColor | null>, gatherer_alternates: Array<string | null> | null }> } };


export const CardRandomDocument = gql`
    query CardRandom {
  cardRandom {
    object
    id
    oracle_id
    multiverse_ids
    tcgplayer_id
    cardmarket_id
    name
    lang
    released_at
    uri
    scryfall_uri
    layout
    highres_image
    image_status
    mana_cost
    cmc
    power
    toughness
    type_line
    oracle_text
    colors
    color_identity
    keywords
    legalities {
      standard
      alchemy
      pioneer
      explorer
      modern
      brawl
      legacy
      historic
      vintage
      pauper
      commander
      penny
    }
    games
    reserved
    foil
    nonfoil
    finishes
    oversized
    promo
    reprint
    variation
    set_id
    set
    set_name
    set_type
    set_uri
    set_search_uri
    scryfall_set_uri
    rulings_uri
    prints_search_uri
    collector_number
    digital
    rarity
    flavor_text
    card_back_id
    artist
    artist_ids
    illustration_id
    border_color
    frame
    frame_effects
    full_art
    textless
    booster
    story_spotlight
    edhrec_rank
    image_uris {
      normal
    }
    prices {
      eur
      eur_foil
    }
  }
}
    `;

/**
 * __useCardRandomQuery__
 *
 * To run a query within a React component, call `useCardRandomQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardRandomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardRandomQuery({
 *   variables: {
 *   },
 * });
 */
export function useCardRandomQuery(baseOptions?: Apollo.QueryHookOptions<GqlCardRandomQuery, GqlCardRandomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlCardRandomQuery, GqlCardRandomQueryVariables>(CardRandomDocument, options);
      }
export function useCardRandomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlCardRandomQuery, GqlCardRandomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlCardRandomQuery, GqlCardRandomQueryVariables>(CardRandomDocument, options);
        }
export type CardRandomQueryHookResult = ReturnType<typeof useCardRandomQuery>;
export type CardRandomLazyQueryHookResult = ReturnType<typeof useCardRandomLazyQuery>;
export type CardRandomQueryResult = Apollo.QueryResult<GqlCardRandomQuery, GqlCardRandomQueryVariables>;
export const CardSearchDocument = gql`
    query CardSearch($q: String!, $unique: String) {
  cardSearch(q: $q, unique: $unique) {
    data {
      name
      mana_cost
      type_line
      oracle_text
      flavor_text
      power
      toughness
      image_uris {
        normal
      }
    }
    has_more
  }
}
    `;

/**
 * __useCardSearchQuery__
 *
 * To run a query within a React component, call `useCardSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardSearchQuery({
 *   variables: {
 *      q: // value for 'q'
 *      unique: // value for 'unique'
 *   },
 * });
 */
export function useCardSearchQuery(baseOptions: Apollo.QueryHookOptions<GqlCardSearchQuery, GqlCardSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlCardSearchQuery, GqlCardSearchQueryVariables>(CardSearchDocument, options);
      }
export function useCardSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlCardSearchQuery, GqlCardSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlCardSearchQuery, GqlCardSearchQueryVariables>(CardSearchDocument, options);
        }
export type CardSearchQueryHookResult = ReturnType<typeof useCardSearchQuery>;
export type CardSearchLazyQueryHookResult = ReturnType<typeof useCardSearchLazyQuery>;
export type CardSearchQueryResult = Apollo.QueryResult<GqlCardSearchQuery, GqlCardSearchQueryVariables>;
export const CatalogArtistNamesDocument = gql`
    query CatalogArtistNames {
  catalogArtistNames {
    total_values
    data
  }
}
    `;

/**
 * __useCatalogArtistNamesQuery__
 *
 * To run a query within a React component, call `useCatalogArtistNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCatalogArtistNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCatalogArtistNamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCatalogArtistNamesQuery(baseOptions?: Apollo.QueryHookOptions<GqlCatalogArtistNamesQuery, GqlCatalogArtistNamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlCatalogArtistNamesQuery, GqlCatalogArtistNamesQueryVariables>(CatalogArtistNamesDocument, options);
      }
export function useCatalogArtistNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlCatalogArtistNamesQuery, GqlCatalogArtistNamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlCatalogArtistNamesQuery, GqlCatalogArtistNamesQueryVariables>(CatalogArtistNamesDocument, options);
        }
export type CatalogArtistNamesQueryHookResult = ReturnType<typeof useCatalogArtistNamesQuery>;
export type CatalogArtistNamesLazyQueryHookResult = ReturnType<typeof useCatalogArtistNamesLazyQuery>;
export type CatalogArtistNamesQueryResult = Apollo.QueryResult<GqlCatalogArtistNamesQuery, GqlCatalogArtistNamesQueryVariables>;
export const CatalogLandTypesDocument = gql`
    query catalogLandTypes {
  catalogLandTypes {
    object
    uri
    total_values
    data
  }
}
    `;

/**
 * __useCatalogLandTypesQuery__
 *
 * To run a query within a React component, call `useCatalogLandTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCatalogLandTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCatalogLandTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCatalogLandTypesQuery(baseOptions?: Apollo.QueryHookOptions<GqlCatalogLandTypesQuery, GqlCatalogLandTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlCatalogLandTypesQuery, GqlCatalogLandTypesQueryVariables>(CatalogLandTypesDocument, options);
      }
export function useCatalogLandTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlCatalogLandTypesQuery, GqlCatalogLandTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlCatalogLandTypesQuery, GqlCatalogLandTypesQueryVariables>(CatalogLandTypesDocument, options);
        }
export type CatalogLandTypesQueryHookResult = ReturnType<typeof useCatalogLandTypesQuery>;
export type CatalogLandTypesLazyQueryHookResult = ReturnType<typeof useCatalogLandTypesLazyQuery>;
export type CatalogLandTypesQueryResult = Apollo.QueryResult<GqlCatalogLandTypesQuery, GqlCatalogLandTypesQueryVariables>;
export const SetByCodeDocument = gql`
    query SetByCode($code: String!) {
  setByCode(code: $code) {
    id
    code
    mtgo_code
    tcgplayer_id
    name
    set_type
    released_at
    block_code
    block
    parent_set_code
    card_count
    printed_size
    digital
    foil_only
    nonfoil_only
    scryfall_uri
    uri
    icon_svg_uri
    search_uri
  }
}
    `;

/**
 * __useSetByCodeQuery__
 *
 * To run a query within a React component, call `useSetByCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useSetByCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSetByCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useSetByCodeQuery(baseOptions: Apollo.QueryHookOptions<GqlSetByCodeQuery, GqlSetByCodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlSetByCodeQuery, GqlSetByCodeQueryVariables>(SetByCodeDocument, options);
      }
export function useSetByCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlSetByCodeQuery, GqlSetByCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlSetByCodeQuery, GqlSetByCodeQueryVariables>(SetByCodeDocument, options);
        }
export type SetByCodeQueryHookResult = ReturnType<typeof useSetByCodeQuery>;
export type SetByCodeLazyQueryHookResult = ReturnType<typeof useSetByCodeLazyQuery>;
export type SetByCodeQueryResult = Apollo.QueryResult<GqlSetByCodeQuery, GqlSetByCodeQueryVariables>;
export const SetListDocument = gql`
    query SetList {
  sets {
    data {
      code
      name
      card_count
      set_type
      icon_svg_uri
      released_at
    }
  }
}
    `;

/**
 * __useSetListQuery__
 *
 * To run a query within a React component, call `useSetListQuery` and pass it any options that fit your needs.
 * When your component renders, `useSetListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSetListQuery({
 *   variables: {
 *   },
 * });
 */
export function useSetListQuery(baseOptions?: Apollo.QueryHookOptions<GqlSetListQuery, GqlSetListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlSetListQuery, GqlSetListQueryVariables>(SetListDocument, options);
      }
export function useSetListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlSetListQuery, GqlSetListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlSetListQuery, GqlSetListQueryVariables>(SetListDocument, options);
        }
export type SetListQueryHookResult = ReturnType<typeof useSetListQuery>;
export type SetListLazyQueryHookResult = ReturnType<typeof useSetListLazyQuery>;
export type SetListQueryResult = Apollo.QueryResult<GqlSetListQuery, GqlSetListQueryVariables>;
export const SymbologyParseManaDocument = gql`
    query SymbologyParseMana($cost: String!) {
  symbologyParseMana(cost: $cost) {
    cost
    cmc
    colors
    colorless
    monocolored
    multicolored
  }
}
    `;

/**
 * __useSymbologyParseManaQuery__
 *
 * To run a query within a React component, call `useSymbologyParseManaQuery` and pass it any options that fit your needs.
 * When your component renders, `useSymbologyParseManaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSymbologyParseManaQuery({
 *   variables: {
 *      cost: // value for 'cost'
 *   },
 * });
 */
export function useSymbologyParseManaQuery(baseOptions: Apollo.QueryHookOptions<GqlSymbologyParseManaQuery, GqlSymbologyParseManaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlSymbologyParseManaQuery, GqlSymbologyParseManaQueryVariables>(SymbologyParseManaDocument, options);
      }
export function useSymbologyParseManaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlSymbologyParseManaQuery, GqlSymbologyParseManaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlSymbologyParseManaQuery, GqlSymbologyParseManaQueryVariables>(SymbologyParseManaDocument, options);
        }
export type SymbologyParseManaQueryHookResult = ReturnType<typeof useSymbologyParseManaQuery>;
export type SymbologyParseManaLazyQueryHookResult = ReturnType<typeof useSymbologyParseManaLazyQuery>;
export type SymbologyParseManaQueryResult = Apollo.QueryResult<GqlSymbologyParseManaQuery, GqlSymbologyParseManaQueryVariables>;
export const SymbologyDocument = gql`
    query Symbology {
  symbology {
    object
    has_more
    data {
      object
      symbol
      svg_uri
      loose_variant
      english
      transposable
      represents_mana
      appears_in_mana_costs
      cmc
      funny
      colors
      gatherer_alternates
    }
  }
}
    `;

/**
 * __useSymbologyQuery__
 *
 * To run a query within a React component, call `useSymbologyQuery` and pass it any options that fit your needs.
 * When your component renders, `useSymbologyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSymbologyQuery({
 *   variables: {
 *   },
 * });
 */
export function useSymbologyQuery(baseOptions?: Apollo.QueryHookOptions<GqlSymbologyQuery, GqlSymbologyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GqlSymbologyQuery, GqlSymbologyQueryVariables>(SymbologyDocument, options);
      }
export function useSymbologyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GqlSymbologyQuery, GqlSymbologyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GqlSymbologyQuery, GqlSymbologyQueryVariables>(SymbologyDocument, options);
        }
export type SymbologyQueryHookResult = ReturnType<typeof useSymbologyQuery>;
export type SymbologyLazyQueryHookResult = ReturnType<typeof useSymbologyLazyQuery>;
export type SymbologyQueryResult = Apollo.QueryResult<GqlSymbologyQuery, GqlSymbologyQueryVariables>;