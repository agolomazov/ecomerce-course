import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import { CartIcon } from '../cart-icon/cart-icon.component';
import { CartDropDown } from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { currentUserSelector } from '../../redux/user/user.selectors';

import { auth } from '../../firebase/firebase.utils';

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from './header.styles';

const HeaderComponent = ({
  currentUser,
  hidden,
}) => {
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionLink to="/contact">CONTACT</OptionLink>
        {currentUser && (
          <OptionLink as='div' to='#' onClick={() => auth.signOut()}>
            SIGN OUT
          </OptionLink>
        )}
        {!currentUser && (
          <OptionLink to="/signin">SIGN IN</OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {!hidden && <CartDropDown />}
    </HeaderContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: currentUserSelector,
  hidden: selectCartHidden,
});

const connectEnhancer = connect(mapStateToProps);

const enhancer = compose(
  connectEnhancer,
);

export const Header = enhancer(HeaderComponent);