import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './shared/Header';
import BlogScreen from './screens/blog/BlogScreen';
import PostViewScreen from './screens/post-view/PostViewScreen';

const App = () => (
  <Router>
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={BlogScreen} />
        <Route path="/blogs/:blogId/posts/:postId" component={PostViewScreen} />
        <Route path="/blogs/:blogId" component={BlogScreen} />
      </Switch>
    </React.Fragment>
  </Router>
);

export default App;
