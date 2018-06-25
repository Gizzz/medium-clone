import React from 'react';
import PropTypes from 'prop-types';

import PostEditScreen from './PostEditScreen';

class PostEditScreen_Container extends React.Component {
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

  handleSave = () => {
    const { post } = this.state.data;
    this.props.history.push(`/blogs/${post.blogId}/posts/${post.id}`);
  }

  render() {
    return (<PostEditScreen data={this.state.data} onSave={this.handleSave} />);
  }
}

PostEditScreen_Container.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default PostEditScreen_Container;
