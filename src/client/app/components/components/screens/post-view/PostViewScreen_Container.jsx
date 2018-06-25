import React from 'react';
import PropTypes from 'prop-types';

import PostViewScreen from './PostViewScreen';

class PostViewScreen_Container extends React.Component {
  state = { data: null }

  componentDidMount() {
    // non-container logic; should be in HOC or presenter component
    window.scrollTo(0, 0);

    const { postId } = this.props.match.params;
    const userId = 1;

    Promise.all([
      fetch(`/api/posts/${postId}`).then((response) => response.json()),
      fetch(`/api/users/${userId}`).then((response) => response.json()),
    ])
      .then((results) => {
        const post = results[0];
        const author = results[1];

        this.setState({
          data: { post, author },
        });
      });
  }

  render() {
    return (<PostViewScreen data={this.state.data} />);
  }
}

PostViewScreen_Container.propTypes = {
  match: PropTypes.object.isRequired,
};

export default PostViewScreen_Container;
