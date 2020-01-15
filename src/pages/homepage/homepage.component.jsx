import React from 'react';

import { DirectoryComponent } from '../../components/directory/directory.component';
import { HomePageContainer } from './homepage.styles';

export const HomePage = () => (
  <HomePageContainer>
    <DirectoryComponent />
  </HomePageContainer>
);