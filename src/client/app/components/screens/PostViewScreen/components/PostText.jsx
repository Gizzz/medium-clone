import React from 'react';
import PropTypes from 'prop-types';

import postTextStyles from '../../../shared/PostText/PostText.module.scss';

const PostText = ({ post }) => (
  <div className={postTextStyles['post-text']}>
    <h1 className={postTextStyles.title}>{post.title}</h1>
    <p><em>{post.subTitle}</em></p>
    <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: post.contentMarkup }} />
  </div>
);

PostText.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostText;

/* eslint max-len: off */
/* eslint react/no-unescaped-entities: off */
/* eslint react/no-danger: off */
