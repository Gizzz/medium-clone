import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

// import global styles here to apply them before any other styles
import './assets/styles/index.scss';

import { ContextWrapper, withContext } from './utils/context';
import Header from './components/shared/Header';
import Spinner from './components/shared/Spinner';

const LoginScreen = Loadable({
  loader: () => import('./components/screens/auth/LoginScreen'),
  loading: Spinner,
});

const LoginScreenWithContext = withContext(LoginScreen);

const RegisterScreen = Loadable({
  loader: () => import('./components/screens/auth/RegisterScreen'),
  loading: Spinner,
});

const RegisterScreenWithContext = withContext(RegisterScreen);

const BlogScreen_Container = Loadable({
  loader: () => import('./components/screens/BlogScreen/BlogScreen_Container'),
  loading: Spinner,
});

const PostViewScreen_Container = Loadable({
  loader: () => import('./components/screens/PostViewScreen/PostViewScreen_Container'),
  loading: Spinner,
});

const PostEditScreen_Container = Loadable({
  loader: () => import('./components/screens/PostEditScreen/PostEditScreen_Container'),
  loading: Spinner,
});

const App = () => (
  <ContextWrapper>
    <Router>
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/blogs/:blogId/posts/:postId/edit" component={PostEditScreen_Container} />
          <Route path="/blogs/:blogId/posts/:postId" component={PostViewScreen_Container} />
          <Route path="/blogs/:blogId" component={BlogScreen_Container} />
          <Route path="/register" component={RegisterScreenWithContext} />
          <Route path="/login" component={LoginScreenWithContext} />
          <Route path="/" exact component={BlogScreen_Container} />
        </Switch>
      </React.Fragment>
    </Router>
  </ContextWrapper>
);

export default App;
