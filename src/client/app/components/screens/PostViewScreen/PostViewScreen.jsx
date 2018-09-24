import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Spinner from '../../shared/Spinner';
import PreContent from '../../shared/PreContent';
import PostHeader from './components/PostHeader';
import PostImage from './components/PostImage';
import PostText from './components/PostText';

import styles from './PostViewScreen.module.scss';

const PostViewScreen = ({ data }) => {
  if (!data) {
    return (<Spinner />);
  }

  const { post, author } = data;

  return (
    <main>
      <PreContent withoutBottomLine />
      <article>
        <PostHeader post={post} author={author} />
        <section className="content">
          <PostImage post={post} />
          <PostText post={post} />
        </section>
        <footer className={styles['post-footer']}>
          <Link className="btn" to={`/blogs/${post.blogId}/posts/${post.id}/edit`}>
            Edit
          </Link>
        </footer>
      </article>
    </main>
  );
};

PostViewScreen.defaultProps = {
  data: null,
};

PostViewScreen.propTypes = {
  data: PropTypes.object,
};

export default PostViewScreen;
