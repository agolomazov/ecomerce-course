import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectorDirectorySelectors } from '../../redux/directory/directory.selectors';

import './directory.styles.scss';
import { MenuItem } from '../menu-item/menu-item.component';

const DirectoryComponentContainer = ({
  sections,
}) => {
  return (
    <div className='directory-menu'>
      { sections.map(section => (
        <MenuItem 
          key={section.id}
          {...section}
        />
      )) }
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectorDirectorySelectors,
});

const connectEnhancer = connect(mapStateToProps);

const enhancer = compose(
  connectEnhancer,
);

export const DirectoryComponent = enhancer(DirectoryComponentContainer);
