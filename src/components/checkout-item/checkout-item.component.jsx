import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {
  clearItemFromCart,
  removeItem,
  addItemToCart,
} from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItemComponent = ({
  item,
  clearItemFromCart,
  removeItem,
  addItemToCart,
}) => {
  const {
    imageUrl,
    name,
    quantity,
    price
  } = item;

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item"/>
      </div>
      <span className="name">{ name }</span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeItem(item)}>&#10094;</div>
        <span className="value">
          {quantity}
        </span>
        <div className="arrow" onClick={() => addItemToCart(item)}>&#10095;</div>
      </span>
      <span className="price">{ price }</span>
      <div 
        className="remove-button"
        onClick={() => clearItemFromCart(item)}
      >
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  clearItemFromCart,
  removeItem,
  addItemToCart,
};

const connectEnhancer = connect(
  null,
  mapDispatchToProps,
);

const enhancer = compose(
  connectEnhancer,
);

export const CheckoutItem = enhancer(CheckoutItemComponent);
