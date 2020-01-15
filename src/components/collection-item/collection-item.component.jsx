import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';

import { CustomButton } from '../custom-button/custom-button.component';

const CollectionItemComponent = ({
  item,
  addItem
}) => {
  const { imageUrl, name, price } = item;
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      ></div>
      <div className="collection-footer">
        <span className="name">{ name }</span>
        <span className="price">{ price }</span>
      </div>
      <CustomButton 
        inverted
        onClick={() => addItem(item)}
      >
        Add to cart
      </CustomButton>
    </div>
  );
}

const mapDispatchToProps = {
  addItem,
};

const connectEnhancer = connect(null, mapDispatchToProps);

const enhancer = compose(
  connectEnhancer,
);

export const CollectionItem = enhancer(CollectionItemComponent);
