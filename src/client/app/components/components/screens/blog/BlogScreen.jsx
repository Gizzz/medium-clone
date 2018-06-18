import React from 'react';
import PropTypes from 'prop-types';

import BlogHeader from './components/BlogHeader';
import PreContent from '../../shared/PreContent';
import PostPreview from './components/PostPreview';
import Footing from './components/Footing';

const BlogScreen = ({ data }) => {
  if (!data) {
    return (<p>Loading...</p>);
  }

  const { blog, author, posts } = data;

  return (
    <main className="blog-home">
      <BlogHeader name={blog.name} description={blog.description} />
      <PreContent />
      <div className="posts">
        {
          posts.map((post) => (
            <PostPreview post={post} author={author} key={post.id} />
          ))
        }
      </div>
      <Footing />
    </main>
  );
};

BlogScreen.defaultProps = {
  data: null,
};

BlogScreen.propTypes = {
  data: PropTypes.object,
};

export default BlogScreen;
