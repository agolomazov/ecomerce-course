export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

  if (existingCartItem) {
    return cartItems.map(cartItem => {
      if (cartItem.id === cartItemToAdd.id) {
        return ({
          ...cartItem,
          quantity: cartItem.quantity + 1,
        });
      }

      return cartItem;
    });
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const clearItemFromCart = (cartItems, clearItem) => {
  return cartItems.filter(item => item.id !== clearItem.id);
};

export const removeItem = (cartItems, removeItem) => {
  const existingItems = cartItems.find(item => item.id === removeItem.id);

  if (existingItems.quantity === 1) {
    return cartItems.filter(item => item.id !== removeItem.id);
  }

  return cartItems.map(item => {
    if (item.id !== removeItem.id) {
      return item;
    }

    return {
      ...item,
      quantity: item.quantity - 1,
    };
  });
};

export const addItemQuantityCart = (cartItems, addedItem) => {
  return cartItems.map(item => {
    if (item.id !== addedItem.id) {
      return item;
    }

    return {
      ...item,
      quantity: item.quantity + 1,
    };
  });
}