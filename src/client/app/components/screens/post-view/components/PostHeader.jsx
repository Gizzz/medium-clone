import React from 'react';
import PropTypes from 'prop-types';

const PostHeader = ({ post, author }) => (
  <header>
    <a className="avatar avatar--big avatar--circled" href="#">
      <img src={author.avatarUrl} />
    </a>
    <div className="text">
      <div className="title">
        <a href="#">{author.fullName}</a>
        <button className="btn btn--smallest follow">Follow</button>
      </div>
      <div className="descr">{author.bio}</div>
      <div className="meta">
        {post.date} · {post.readTimeEstimate}
      </div>
    </div>
  </header>
);

PostHeader.propTypes = {
  post: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
};

export default PostHeader;
