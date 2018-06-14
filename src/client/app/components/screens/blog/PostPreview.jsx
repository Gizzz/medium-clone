import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostPreview = ({ post, author }) => (
  <article className={post.isLargePreview ? 'post post--full-width' : 'post'}>
    <Link className="image" to="/blogs/1/posts/1">
      <div className="overlay-border" />
      <img src={post.previewImgUrl} />
    </Link>
    <div className="text">
      <Link className="text-link" to="/blogs/1/posts/1">
        <h3>{post.title}</h3>
        <p>{post.subTitle}</p>
      </Link>
      <div className="meta">
        <a className="avatar avatar--small avatar--circled" href="#">
          <img src={author.avatarUrl} />
        </a>
        <div className="sub-meta">
          <a href="#" className="author">{author.fullName}</a>
          <span className="date">{post.date}</span>
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
