import React from 'react';
import PropTypes from 'prop-types';

import PostEditScreen from './PostEditScreen';

class PostEditScreen_Container extends React.Component {
  state = { data: null }

  componentDidMount() {
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
    return (<PostEditScreen data={this.state.data} />);
  }
}

PostEditScreen_Container.propTypes = {
  match: PropTypes.object.isRequired,
};

export default PostEditScreen_Container;
