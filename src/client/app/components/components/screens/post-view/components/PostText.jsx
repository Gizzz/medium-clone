import React from 'react';
import PropTypes from 'prop-types';

const PostText = ({ post }) => (
  <div className="post-text">
    <h1 className="title">{post.title}</h1>
    <p className="sub-title"><em>{post.subTitle}</em></p>
    <div style={{ display: 'contents' }} dangerouslySetInnerHTML={post.contentMarkup} />
  </div>
);

PostText.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostText;

/* eslint max-len: off */
/* eslint react/no-unescaped-entities: off */
/* eslint react/no-danger: off */
