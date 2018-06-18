import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/shared/Header';
import BlogScreen from './components/screens/blog/BlogScreen';
import PostViewScreen from './components/screens/post-view/PostViewScreen';

import './assets/styles/index.scss';

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
