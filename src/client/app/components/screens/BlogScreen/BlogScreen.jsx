import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../../shared/Spinner';
import BlogHeader from './components/BlogHeader';
import PreContent from '../../shared/PreContent';
import PostPreview from './components/PostPreview';
import Footing from './components/Footing';

import styles from './BlogScreen.module.scss';

const BlogScreen = ({ data }) => {
  if (!data) {
    return (<Spinner />);
  }

  const { blog, author, posts } = data;

  return (
    <main>
      <BlogHeader name={blog.name} description={blog.description} />
      <PreContent />
      <div className={styles.posts}>
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
