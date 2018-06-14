import React from 'react';

import '../assets/styles/index.scss';

import Header from './shared/Header';
import BlogScreen from './screens/blog/BlogScreen';

const App = () => (
  <React.Fragment>
    <Header />
    <BlogScreen />
  </React.Fragment>
);

export default App;
