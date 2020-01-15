import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setCurrentUser } from './redux/user/user.actions';
import { currentUserSelector } from './redux/user/user.selectors';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import './App.css';

import { Header } from './components/header/header.component';
import { HomePage } from './pages/homepage/homepage.component';
import { ShopPage } from './pages/shop/shop.component';
import { SignInAndSignUpPage } from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { CheckoutPage } from './pages/checkout/checkout.component';

const AppContainer = ({
  setCurrentUser,
  currentUser
}) => {

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(null);
      }
    });
    
    return () => {
      unsubscribeFromAuth();
    }
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/checkout" component={CheckoutPage} exact />
        <Route path="/signin" render={() => currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />} />
      </Switch>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: currentUserSelector,
});

const mapDispatchToProps = ({
  setCurrentUser,
});

const connectEnhancer = connect(mapStateToProps, mapDispatchToProps);

const enhancer = compose(
  connectEnhancer,
);

export const App = enhancer(AppContainer);