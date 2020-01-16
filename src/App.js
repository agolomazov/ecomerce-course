import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setCurrentUser } from './redux/user/user.actions';
import { currentUserSelector } from './redux/user/user.selectors';

import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';
import './App.css';

import { Header } from './components/header/header.component';
import { HomePage } from './pages/homepage/homepage.component';
import { ShopPage } from './pages/shop/shop.component';
import { SignInAndSignUpPage } from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { CheckoutPage } from './pages/checkout/checkout.component';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

const AppContainer = ({
  setCurrentUser,
  currentUser,
  collectionArray,
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

        addCollectionAndDocuments('collections', collectionArray.map(({ title, items }) => ({ title, items })));
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
  collectionArray: selectCollectionsForPreview,
});

const mapDispatchToProps = ({
  setCurrentUser,
});

const connectEnhancer = connect(mapStateToProps, mapDispatchToProps);

const enhancer = compose(
  connectEnhancer,
);

export const App = enhancer(AppContainer);