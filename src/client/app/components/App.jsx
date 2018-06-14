import React from 'react';

import Header from './shared/Header';
import BlogScreen from './screens/blog/BlogScreen';
// import PostViewScreen from './screens/post-view/PostViewScreen';

const App = () => (
  <React.Fragment>
    <Header />
    <BlogScreen />
    {/* <PostViewScreen /> */}
  </React.Fragment>
);

export default App;
