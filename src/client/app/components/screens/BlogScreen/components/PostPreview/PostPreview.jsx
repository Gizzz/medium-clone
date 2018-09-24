import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './PostPreview.module.scss';

const PostPreview = ({ post, author }) => (
  <article className={post.isLargePreview ? `${styles.post} ${styles['post--full-width']}` : styles.post}>
    <Link className={styles.image} to={`/blogs/${post.blogId}/posts/${post.id}`}>
      <div className={styles['overlay-border']} />
      <picture>
        <source
          srcSet={`https://cdn-images-1.medium.com/max/400/${post.imgDescriptor} 1x, https://cdn-images-1.medium.com/max/800/${post.imgDescriptor} 2x`}
          media="(max-width: 400px)"
        />
        <source
          srcSet={`https://cdn-images-1.medium.com/max/600/${post.imgDescriptor} 1x, https://cdn-images-1.medium.com/max/1200/${post.imgDescriptor} 2x`}
          media="(min-width: 401px) and (max-width: 600px)"
        />
        <source
          srcSet={`https://cdn-images-1.medium.com/max/800/${post.imgDescriptor} 1x, https://cdn-images-1.medium.com/max/1600/${post.imgDescriptor} 2x`}
          media="(min-width: 601px)"
        />
        <img src={`https://cdn-images-1.medium.com/max/800/${post.imgDescriptor}`} />
      </picture>
    </Link>
    <div className={styles.text}>
      <Link className={styles['text-link']} to={`/blogs/${post.blogId}/posts/${post.id}`}>
        <h3>{post.title}</h3>
        <p>{post.subTitle}</p>
      </Link>
      <div className={styles.meta}>
        <a className="avatar avatar--small avatar--circled" href="https://blog.kentcdodds.com/@kentcdodds" target="_blank" rel="noopener noreferrer">
          <img src={author.avatarUrl} />
        </a>
        <div className={styles['sub-meta']}>
          <a className={styles.author} href="https://blog.kentcdodds.com/@kentcdodds" target="_blank" rel="noopener noreferrer">
            {author.username}
          </a>
          <span className={styles.date}>{post.date}</span>
        </div>
      </div>
    </div>
  </article>
);

PostPreview.propTypes = {
  post: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
};

export default PostPreview;
