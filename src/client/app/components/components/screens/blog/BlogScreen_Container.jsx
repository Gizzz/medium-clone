import React from 'react';
import BlogScreen from './BlogScreen';

class BlogScreen_Container extends React.Component {
  state = { data: null }

  componentDidMount() {
    // non-container logic; should be in HOC or presenter component
    window.scrollTo(0, 0);

    const blogId = 1;
    const userId = 1;

    Promise.all([
      fetch(`/api/blogs/${blogId}`).then((response) => response.json()),
      fetch(`/api/users/${userId}`).then((response) => response.json()),
      fetch('/api/posts').then((response) => response.json()),
    ])
      .then((results) => {
        const blog = results[0];
        const author = results[1];
        const posts = results[2];

        this.setState({
          data: { blog, author, posts },
        });
      });
  }

  render() {
    return (<BlogScreen data={this.state.data} />);
  }
}

export default BlogScreen_Container;
