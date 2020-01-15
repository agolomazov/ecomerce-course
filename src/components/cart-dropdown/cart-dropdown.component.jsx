import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import './cart-dropdown.styles.scss';

import { CustomButton } from '../custom-button/custom-button.component';
import { CartItem } from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

const CartDropDownComponent = ({
  items,
  history,
  toggleCartHidden,
}) => {
  const clickHandler = () => {
    history.push('/checkout');
    toggleCartHidden();
  }

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        { items.length > 0 && items.map(item => (
          <CartItem key={item.id} item={item} />
        )) }
        { !items.length && (
          <span className="empty-message">Your cart is empty</span>
        ) }
      </div>
      <CustomButton onClick={clickHandler}>
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  items: selectCartItems,
});

const mapDispatchToProps = {
  toggleCartHidden,
}

const connectEnhancer = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const enhancer = compose(
  connectEnhancer,
  withRouter,
);

export const CartDropDown = enhancer(CartDropDownComponent);