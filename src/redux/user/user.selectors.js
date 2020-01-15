import { createSelector } from 'reselect';
import { pathOr } from 'ramda';

const userSelector = state => pathOr(null, ['user'], state);

export const currentUserSelector = createSelector(
  userSelector,
  user => pathOr(null, ['currentUser'], user),
);