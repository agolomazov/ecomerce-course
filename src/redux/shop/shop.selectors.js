import { createSelector } from 'reselect';
import { pathOr } from 'ramda';

const shopSelector = state => pathOr(null, ['shop'], state);

export const selectorShopCollections = createSelector(
  shopSelector,
  shop => pathOr([], ['collections'], shop),
);

export const selectCollectionForPreview = createSelector(
  [selectorShopCollections],
  collections => Object.keys(collections).map(key => collections[key])
);

export const selectCollection = collectionUrlParam => 
  createSelector(
    [selectorShopCollections],
    collections => collections[collectionUrlParam],
  );
