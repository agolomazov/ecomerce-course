import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './collections-overview.styles.scss';

import { CollectionPreview } from '../preview-collection/collection-preview.component';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

export const CollectionsOverviewComponent = ({ collections }) => (
  <div className="collections-overview">
    {collections.map(collection => (
      <CollectionPreview
        key={collection.id}
        {...collection}
      />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
});

const connectEnhancer = connect(mapStateToProps);

const enhancer = compose(
  connectEnhancer,
);

export const CollectionsOverview = enhancer(CollectionsOverviewComponent);