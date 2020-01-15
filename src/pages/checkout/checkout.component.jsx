import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCartItems,
  selectCartTotal,
} from '../../redux/cart/cart.selectors';

import { CheckoutItem } from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';

const CheckoutPageComponent = ({ cartItems, total }) => {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {
        cartItems.map(cartItem => (
          <CheckoutItem key={cartItem.id} item={cartItem} />
        ))
      }
      <div className="total">
        <span className="total">
          TOTAL: ${total}
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

const connectEnhancer = connect(mapStateToProps);

const enhancer = compose(
  connectEnhancer,
);

export const CheckoutPage = enhancer(CheckoutPageComponent);