import { createSelector } from 'reselect';
import { pathOr } from 'ramda';

const selectorDirectory = state => pathOr(null, ['directory'], state);

export const selectorDirectorySelectors = createSelector(
  [selectorDirectory],
  directory => pathOr([], ['sections'], directory),
);