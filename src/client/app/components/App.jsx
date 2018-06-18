import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/shared/Header';
import BlogScreen_Container from './components/screens/blog/BlogScreen_Container';
import PostViewScreen_Container from './components/screens/post-view/PostViewScreen_Container';

import './assets/styles/index.scss';

const App = () => (
  <Router>
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={BlogScreen_Container} />
        <Route path="/blogs/:blogId/posts/:postId" component={PostViewScreen_Container} />
        <Route path="/blogs/:blogId" component={BlogScreen_Container} />
      </Switch>
    </React.Fragment>
  </Router>
);

export default App;
