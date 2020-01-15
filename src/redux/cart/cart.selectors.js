import { createSelector } from 'reselect';
import { pathOr } from 'ramda';

const selectCart = state => pathOr(null, ['cart'], state);

export const selectCartItems = createSelector(
  [selectCart],
  cart => pathOr([], ['cartItems'], cart),
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => pathOr(true, ['hidden'], cart),
);

export const selectCartItemsCount = createSelector(
  selectCartItems,
  cartItems => cartItems.reduce((acc, item) => acc + item.quantity, 0),
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  cart => cart.reduce((acc, product) => {
    return acc + (product.price * product.quantity);
  }, 0),
);